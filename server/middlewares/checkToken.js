require("dotenv").config();
const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
const TokenError = require('../errors/TokenError');
const userQueries =require('../controllers/queries/userQueries');

const {
  env: {
    ACCESS_TOKEN_SECRET,
  },
} = process;

module.exports.checkAuth = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return next(new TokenError('need token'));
  }
  try {
    const tokenData = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    console.log(tokenData);
    const foundUser = await userQueries.findUser({ id: tokenData.id });
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
    next(new TokenError());
  }
};

module.exports.checkToken = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return next(new TokenError('need token'));
  }
  try {
    req.tokenData = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    next();
  } catch (err) {
    next(new TokenError());
  }
};
