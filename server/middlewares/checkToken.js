require("dotenv").config();
const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
const TokenError = require('../errors/TokenError');
const userQueries =require('../controllers/queries/userQueries');
const {errorLogging} = require('../utils/logFunction')

const {
  env: {
    ACCESS_TOKEN_SECRET,
  },
} = process;

module.exports.checkAuth = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    const err = new TokenError('need token');
    errorLogging(err);
    return next(err);
  }
  try {
    const tokenData = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

    const foundUser = await userQueries.findUser({ id: tokenData.id });
    userQueries.countUsersRoles();
    res.send({
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      role: foundUser.role,
      id: foundUser.id,
      avatar: foundUser.avatar,
      displayName: foundUser.displayName,
      balance: foundUser.balance,
      email: foundUser.email,
    });
  } catch (err) {
    errorLogging(err);
    next(new TokenError());
  }
};

module.exports.checkToken = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    const err = new TokenError('need token');
    errorLogging(err);
    return next(err);
  }
  try {
    req.tokenData = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    next();
  } catch (err) {
    errorLogging(err);
    next(new TokenError());
  }
};
