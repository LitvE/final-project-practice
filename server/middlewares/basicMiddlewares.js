const bd = require('../db/models');
const { Contest } = require('../db/models');
//const NotFound = require('../errors/UserNotFoundError');
const RightsError = require('../errors/RightsError');
const ServerError = require('../errors/ServerError');
const CONSTANTS = require('../constants');
const { Op } = require('sequelize');

module.exports.parseBody = (req, res, next) => {
  const {body: {contests}} = req;
  req.body.contests = JSON.parse(contests);
  for (let i = 0; i < contests.length; i++) {
    if (contests[ i ].haveFile) {
      const file = req.files.splice(0, 1);
      req.body.contests[ i ].fileName = file[ 0 ].filename;
      req.body.contests[ i ].originalFileName = file[ 0 ].originalname;
    }
  }
  next();
};

module.exports.canGetContest = async (req, res, next) => {
  let result = null;
  const { params: { contestId }, tokenData: { id, role } } = req;
  try {
    if (role === CONSTANTS.CUSTOMER) {
      result = await Contest.findOne({
        where: { id: contestId, userId: id },
      });
    } else if (role === CONSTANTS.CREATOR) {
      result = await Contest.findOne({
        where: {
          id: contestId,
          status: {
            [ Op.or ]: [
              CONSTANTS.CONTEST_STATUS_ACTIVE,
              CONSTANTS.CONTEST_STATUS_FINISHED,
            ],
          },
        },
      });
    }
    result ? next() : next(new RightsError());
  } catch (e) {
    next(new ServerError(e));
  }
};

module.exports.onlyForCreative = (req, res, next) => {
  const { tokenData: { role } } = req;
  if (role === CONSTANTS.CUSTOMER) {
    next(new RightsError());
  } else {
    next();
  }

};

module.exports.onlyForCustomer = (req, res, next) => {
  const { tokenData: { role } } = req;
  if (role === CONSTANTS.CREATOR) {
    return next(new RightsError('this page only for customers'));
  } else {
    next();
  }
};

module.exports.canSendOffer = async (req, res, next) => {
  const { tokenData: { role }, body: {contestId} } = req;
  if (role === CONSTANTS.CUSTOMER) {
    return next(new RightsError());
  }
  try {
    const result = await Contest.findOne({
      where: {
        id: contestId,
      },
      attributes: ['status'],
    });
    if (result.get({ plain: true }).status ===
      CONSTANTS.CONTEST_STATUS_ACTIVE) {
      next();
    } else {
      return next(new RightsError());
    }
  } catch (e) {
    next(new ServerError());
  }

};

module.exports.onlyForCustomerWhoCreateContest = async (req, res, next) => {
  const { tokenData: { id }, body: {contestId} } = req;
  try {
    const result = await Contest.findOne({
      where: {
        userId: id,
        id: contestId,
        status: CONSTANTS.CONTEST_STATUS_ACTIVE,
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.canUpdateContest = async (req, res, next) => {
  const { tokenData: { id }, body: {contestId} } = req;
  try {
    const result = Contest.findOne({
      where: {
        userId: id,
        id: contestId,
        status: { [ Op.not ]: CONSTANTS.CONTEST_STATUS_FINISHED },
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};

