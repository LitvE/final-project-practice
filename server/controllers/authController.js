const createHtppError = require("http-errors");
const { User, RefreshToken } = require("./../db/models");
const authService = require("./../services/authService");
const userQueries = require('./queries/userQueries');

exports.signInUser = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    const foundUser = await User.findOne({
      where: { email },
    });

    await userQueries.passwordCompare(password, foundUser.password);

    if (foundUser) {
      const data = await authService.createSession(foundUser);
      const accessToken = data.tokenPair.accessToken;
      console.log(accessToken);
      res.send({ token: accessToken });
    }
    next(/*createHtppError(401, "Error password or email")*/);
  } catch (err) {
    next(err);
  }
};

exports.signUpUser = async (req, res, next) => {
  try {
    const { body, hashPass } = req;
    body.password = hashPass;
    const userInstance = await User.create(body);
    if (userInstance) {
      const data = await authService.createSession(userInstance);
      const accessToken = data.tokenPair.accessToken;
      return res.send({ token: accessToken });
    }
    next(createHtppError(401, "Error new user"));
  } catch (err) {
    next(err);
  }
};

exports.refreshAuth = async (req, res, next) => {
  try {
    const {
      body: { refreshToken },
    } = req;
    const tokenInstance = await RefreshToken.findOne({
      where: {
        token: refreshToken,
      },
    });
    if (tokenInstance) {
      const data = await authService.refreshSession(tokenInstance);
      return res.send({ data });
    }
    next(createHtppError(401, "Error tokens"));
  } catch (err) {
    next(err);
  }
};
