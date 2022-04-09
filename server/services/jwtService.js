require("dotenv").config();
const util = require("util");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const {
  env: {
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXP,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXP,
  },
} = process;

const sign = util.promisify(jwt.sign);

const signTokenPair = async (payload) => {
  const tokenPair = {};
  tokenPair.accessToken = await sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXP,
  });
  tokenPair.refreshToken = await sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXP,
  });
  return tokenPair;
};

module.exports = {
  signTokenPair,
};
