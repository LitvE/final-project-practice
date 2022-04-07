const createHtppError = require("http-errors");
const { User, RefreshToken } = require("./../db/models");
const authService = require("./../services/authService");
const { passwordCompare } = require("./../controllers/queries/userQueries");

exports.signInUser = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const foundUser = await User.findOne({
      where: { email },
    });
    if (foundUser && (await foundUser.passwordCompare(password))) {
      const data = await authService.createSession(foundUser);
      return res.send({ data });
    }
    next(createHtppError(401, "Error password or email"));
  } catch (err) {
    next(err);
  }
};

exports.signUpUser = async (req, res, next) => {
  try {
    const { body } = req;
    const userInstance = await User.create(body);
    if (userInstance) {
      const data = await authService.createSession(userInstance);
      return res.send({ data });
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
