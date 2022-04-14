const db = require('../db/models');
const { Contest, Offer, Rating, Select, User } = require('../db/models');
//const Sequelize = require('sequelize');
const ServerError =require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');
const { Op } = require('sequelize');

module.exports.dataForContest = async (req, res, next) => {
  const response = {};
  try {
    const { body: { characteristic1, characteristic2 } } = req;

    const types = [characteristic1, characteristic2, 'industry'].filter(Boolean);

    const characteristics = await Select.findAll({
      attributes: ['type', 'describe'],
      where: {
        type: {
          [ Op.or ]: types,
        },
      },
    });
    if (!characteristics) {
      return next(new ServerError());
    }
    characteristics.forEach(characteristic => {
      if (!response[ characteristic.type ]) {
        response[ characteristic.type ] = [];
      }
      response[ characteristic.type ].push(characteristic.describe);
    });
    res.send(response);
  } catch (err) {
    next(new ServerError('cannot get contest preferences'));
  }
};

module.exports.getContestById = async (req, res, next) => {

  const { params: { contestId }, tokenData: { id, role } } = req;
  try {
    let contestInfo = await Contest.findOne({
      where: { id: contestId },
      order: [
        [Offer, 'id', 'asc'],
      ],
      include: [
        {
          model: User,
          required: true,
          attributes: {
            exclude: [
              'password',
              'role',
              'balance',
              'accessToken',
            ],
          },
        },
        {
          model: Offer,
          required: false,
          where: role === CONSTANTS.CREATOR
            ? { userId: id }
            : {},
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: User,
              required: true,
              attributes: {
                exclude: [
                  'password',
                  'role',
                  'balance',
                  'accessToken',
                ],
              },
            },
            {
              model: Rating,
              required: false,
              where: { userId: id },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });

    contestInfo = contestInfo.get({ plain: true });
    contestInfo.Offers.forEach(offer => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    res.send(contestInfo);
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.downloadFile = async (req, res, next) => {
  const { params: { fileName } } = req;
  //const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + fileName;
  res.download(file);
  next();
};

module.exports.updateContest = async (req, res, next) => {
  const { file, tokenData: { id } } = req;
  if (file) {
    req.body.fileName = req.file.filename;
    req.body.originalFileName = req.file.originalname;
  }
  const contestId = req.body.contestId;
  delete req.body.contestId;
  try {
    const updatedContest = await contestQueries.updateContest(req.body, {
      id: contestId,
      userId: id,
    });
    res.send(updatedContest);
  } catch (e) {
    next(e);
  }
};

module.exports.setNewOffer = async (req, res, next) => {
  const { file, tokenData: { id }, body: { contestType, offerData, contestId, customerId } } = req;
  const obj = {};
  if (contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = file.filename;
    obj.originalFileName = file.originalname;
  } else {
    obj.text = offerData;
  }
  obj.userId = id;
  obj.contestId = contestId;
  try {
    const result = await contestQueries.createOffer(obj);
    delete result.contestId;
    delete result.userId;
    controller.getNotificationController().emitEntryCreated(
      customerId);
    const User = Object.assign({}, req.tokenData, { id: id });
    res.send(Object.assign({}, result, { User }));
  } catch (e) {
    return next(new ServerError());
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED }, { id: offerId });
  controller.getNotificationController().emitChangeOfferStatus(creatorId,
    'Someone of yours offers was rejected', contestId);
  return rejectedOffer;
};

const resolveOffer = async (
  contestId, creatorId, orderId, offerId, priority, transaction) => {
  const finishedContest = await contestQueries.updateContestStatus({
    status: db.sequelize.literal(`   CASE
            WHEN "id"=${ contestId }  AND "orderId"='${ orderId }' THEN '${ CONSTANTS.CONTEST_STATUS_FINISHED }'
            WHEN "orderId"='${ orderId }' AND "priority"=${ priority +
    1 }  THEN '${ CONSTANTS.CONTEST_STATUS_ACTIVE }'
            ELSE '${ CONSTANTS.CONTEST_STATUS_PENDING }'
            END
    `),
  }, { orderId }, transaction);
  await userQueries.updateUser(
    { balance: db.sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId, transaction);
  const updatedOffers = await contestQueries.updateOfferStatus({
    status: db.sequelize.literal(` CASE
            WHEN "id"=${ offerId } THEN '${ CONSTANTS.OFFER_STATUS_WON }'
            ELSE '${ CONSTANTS.OFFER_STATUS_REJECTED }'
            END
    `),
  }, {
    contestId,
  }, transaction);
  transaction.commit();
  const arrayRoomsId = [];
  updatedOffers.forEach(offer => {
    if (offer.status === CONSTANTS.OFFER_STATUS_REJECTED && creatorId !==
      offer.userId) {
      arrayRoomsId.push(offer.userId);
    }
  });
  controller.getNotificationController().emitChangeOfferStatus(arrayRoomsId,
    'Someone of yours offers was rejected', contestId);
  controller.getNotificationController().emitChangeOfferStatus(creatorId,
    'Someone of your offers WIN', contestId);
  return updatedOffers[ 0 ].dataValues;
};

module.exports.setOfferStatus = async (req, res, next) => {
  const { body: { command, offerId, creatorId, contestId, orderId, priority } } = req;
  let transaction;
  if (command === 'reject') {
    try {
      const offer = await rejectOffer(offerId, creatorId,
        contestId);
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (command === 'resolve') {
    try {
      transaction = await db.sequelize.transaction();
      const winningOffer = await resolveOffer(contestId,
        creatorId, orderId, offerId,
        priority, transaction);
      res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  }
};

module.exports.getCustomersContests = (req, res, next) => {
  const { query: { limit, offset, status }, tokenData: { id } } = req;
  Contest.findAll({
    where: { status, userId: id },
    limit,
    offset: offset ? offset : 0,
    order: [['id', 'DESC']],
    include: [
      {
        model: Offer,
        required: false,
        attributes: ['id'],
      },
    ],
  })
    .then(contests => {
      contests.forEach(
        contest => contest.dataValues.count = contest.dataValues.Offers.length);
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch(err => next(new ServerError(err)));
};

module.exports.getContests = (req, res, next) => {
  const { query: { offset, limit, typeIndex, contestId, industry, awardSort, ownEntries }, tokenData: { id } } = req;

  const predicates = UtilFunctions.createWhereForAllContests(typeIndex,
    contestId, industry, awardSort);
  console.log('ownEntries is: ', ownEntries);
  Contest.findAll({
    where: predicates.where,
    order: predicates.order,
    limit,
    offset: offset ? offset : 0,
    include: [
      {
        model: Offer,
        //required: ownEntries,
        //where: ownEntries ? { userId: id } : {},
        attributes: ['id'],
      },
    ],
  })
    .then(contests => {
      contests.forEach(
        contest => contest.dataValues.count = contest.dataValues.Offers.length);

      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch(err => {
      next(new ServerError(err));
    });
};
