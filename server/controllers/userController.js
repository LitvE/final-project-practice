require('dotenv').config();
const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
//const db = require('../db/models');
const { Sequelize, sequelize, Contest, Offer, Rating, Banks, User } = require('../db/models');
//const NotUniqueEmail = require('../errors/NotUniqueEmail');
//const moment = require('moment');
const { v4: uuid } = require('uuid');
const controller = require('../socketInit');
const userQueries = require('./queries/userQueries');
const bankQueries = require('./queries/bankQueries');
const ratingQueries = require('./queries/ratingQueries');
const { Op } = require('sequelize');
const {errorLogging} = require('../utils/logFunction');

function getQuery (offerId, userId, mark, isFirst, transaction) {
  const getCreateQuery = () => ratingQueries.createRating({
    offerId,
    mark,
    userId,
  }, transaction);
  const getUpdateQuery = () => ratingQueries.updateRating({ mark },
    { offerId, userId }, transaction);
  return isFirst ? getCreateQuery : getUpdateQuery;
}

module.exports.changeMark = async (req, res, next) => {
  const { body, tokenData } = req;
  let sum = 0;
  let avg = 0;
  let transaction;
  const { isFirst, offerId, mark, creatorId } = body;
  const userId = tokenData.userId;
  try {
    transaction = await sequelize.transaction(
      { isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED });
    const query = getQuery(offerId, userId, mark, isFirst, transaction);
    await query();
    const offersArray = await Rating.findAll({
      include: [
        {
          model: Offer,
          required: true,
          where: { userId: creatorId },
        },
      ],
      transaction,
    });
    for (let i = 0; i < offersArray.length; i++) {
      sum += offersArray[ i ].dataValues.mark;
    }
    avg = sum / offersArray.length;

    await userQueries.updateUser({ rating: avg }, creatorId, transaction);
    transaction.commit();
    controller.getNotificationController().emitChangeMark(creatorId);
    res.send({ userId: creatorId, rating: avg });
  } catch (err) {
    transaction.rollback();
    errorLogging(err);
    next(err);
  }
};

module.exports.payment = async (req, res, next) => {
  const { body: { number, expiry, cvc, price, contests }, tokenData: { id } } = req;
  const transaction = await sequelize.transaction();
  try {
    const squadHelpCreditCardNumber = process.env.SQUADHELP_BANK_NUMBER;

    const customerCreditCard = await Banks.findOne({
      where: {
        cardNumber: number.replace(/ /g, ''),
        cvc,
        expiry,
      },
      transaction,
    });

    const squadHelpCreditCard = await Banks.findOne({
      where: {
        cardNumber: squadHelpCreditCardNumber,
      },
      transaction,
    });

    await squadHelpCreditCard.update({
      balance: Sequelize.literal(`"Banks"."balance"+${ price }`),
    },
    transaction,
    );

    await customerCreditCard.update({
      balance: Sequelize.literal(`"Banks"."balance"-${ price }`),
    },
    transaction,
    );

    const orderId = uuid();
    contests.forEach((contest, index) => {
      const prize = index === contests.length - 1 ? Math.ceil(
        price / contests.length)
        : Math.floor(price / contests.length);
      contest = Object.assign(contest, {
        status: index === 0 ? 'active' : 'pending',
        userId: id,
        priority: index + 1,
        orderId,
        prize,
      });
    });

    await Contest.bulkCreate(contests, {
      feilds: ['contentType', 'title', 'industry', 'ficusOfwork', 'targetCustomer', 'status', 'brandStyle', 'prize', 'priority', 'oderId', 'userId'],
    }, transaction);
    transaction.commit();
    res.send();
  } catch (err) {
    transaction.rollback();
    errorLogging(err);
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  const { file, body, tokenData: { id } } = req;
  try {
    if (file) {
      body.avatar = file.filename;
    }
    const updatedUser = await userQueries.updateUser(body,
      id);
    res.send({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      displayName: updatedUser.displayName,
      avatar: updatedUser.avatar,
      email: updatedUser.email,
      balance: updatedUser.balance,
      role: updatedUser.role,
      id: updatedUser.id,
    });
  } catch (err) {
    errorLogging(err);
    next(err);
  }
};

module.exports.cashout = async (req, res, next) => {
  const { body: { sum, number, expiry, cvc }, tokenData: { id } } = req;
  const transaction = await sequelize.transaction();
  try {

    const updatedUser = await userQueries.updateUser(
      { balance: sequelize.literal('balance - ' + sum) },
      id, 
      transaction);

    const squadHelpCreditCardNumber = process.env.SQUADHELP_BANK_NUMBER;

    const creativeCreditCard = await Banks.findOne({
      where: {
        cardNumber: number.replace(/ /g, ''),
        cvc,
        expiry,
      },
      transaction,
    });

    const squadHelpCreditCard = await Banks.findOne({
      where: {
        cardNumber: squadHelpCreditCardNumber,
      },
      transaction,
    });

    await squadHelpCreditCard.update({
      balance: sequelize.literal(`"Banks"."balance"-${ sum }`),
    },
    transaction,
    );

    await creativeCreditCard.update({
      balance: sequelize.literal(`"Banks"."balance"+${ sum }`),
    },
    transaction,
    );

    transaction.commit();
    res.send({ balance: updatedUser.balance });
  } catch (err) {
    transaction.rollback();
    errorLogging(err);
    next(err);
  }
};


