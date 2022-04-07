const util = require("util");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const {
  env: {
    ACCESS_TOKEN_SECRET = uuidv4(),
    ACCESS_TOKEN_EXP = "0.5h",
    REFRESH_TOKEN_SECRET = uuidv4(),
    REFRESH_TOKEN_EXP = "30 days",
  },
} = process;

const sign = util.promisify(jwt.sign);

const accessTokenSign = (payload) => {
  sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXP,
  });
};

const refreshTokenSign = (payload) => {
  sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXP,
  });
};

const signTokenPair = async (accessPayload, refreshPayload) => {
  return {
    accessToken: await accessTokenSign(accessPayload),
    refreshToken: await refreshTokenSign(refreshPayload),
  };
};

module.exports = {
  signTokenPair,
};
