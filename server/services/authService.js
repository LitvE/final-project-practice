require("dotenv").config();
const jwtService = require("./jwtService");
const { RefreshToken } = require("../db/models");
const { DEVICES_LIMIT } = require("./../constants");
const _ = require("lodash");

const {
  env: {
    REFRESH_TOKEN_EXP,
  },
} = process;

exports.createSession = async (userInstance) => {
  const { accessToken, refreshToken } = await jwtService.signTokenPair(
    {
      id: userInstance.getDataValue("id"),
      role: userInstance.getDataValue("role"),
      firstName: userInstance.getDataValue("firstName"),
      lastName: userInstance.getDataValue("lastName"),
      displayName: userInstance.getDataValue("displayName"),
      avatar: userInstance.getDataValue("avatar"),
      email: userInstance.getDataValue("email"),
    }
  );

  if ((await userInstance.countRefreshTokens()) >= DEVICES_LIMIT) {
    const [oldRefreshTokenInstance] = await userInstance.getRefreshTokens({
      order: [["updatedAt", "ASC"]],
    });
    await oldRefreshTokenInstance.update({
      token: refreshToken,
    });
  } else {
    /*await userInstance.countRefreshTokens({
      token: refreshToken,
    });*/
    await RefreshToken.create({
      userId: userInstance.getDataValue("id"),
      token: refreshToken,
      expiredIn: setExpiredIn(30),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return {
    user: sendUser(userInstance),
    tokenPair: {
      accessToken,
      refreshToken,
    },
  };
};

exports.refreshSession = async (refreshTokenInstance) => {
  const userInstance = await refreshTokenInstance.getUser();
  if (userInstance) {
    const { accessToken, refreshToken } = await jwtService.signTokenPair({
      id: userInstance.getDataValue("id"),
      role: userInstance.getDataValue("role"),
      firstName: userInstance.getDataValue("firstName"),
      lastName: userInstance.getDataValue("lastName"),
      displayName: userInstance.getDataValue("displayName"),
      avatar: userInstance.getDataValue("avatar"),
      email: userInstance.getDataValue("email"),
    });
    await refreshTokenInstance.update({
      token: refreshToken,
    });
    return {
      user: sendUser(userInstance),
      tokenPair: {
        accessToken,
        refreshToken,
      },
    };
  }
};

function sendUser(userInstance) {
  const data = userInstance.get();
  return _.omit(data, ["password"]);
}

function setExpiredIn (days) {
  return  new Date(Date.now() + days * 24*60*60*1000);
}
