const express = require("express");
//const validators = require('../middlewares/validators');
//const userController = require('../controllers/userController');
//const hashPass = require('../middlewares/hashPassMiddle');
const AuthController = require("./../controllers/authController");
const authRouter = express.Router();
/*
authRouter.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration,
);

authRouter.post(
  '/login',
  validators.validateLogin,
  userController.login,
);
*/

authRouter.post("/sign-in", AuthController.signInUser);
authRouter.post("/sign-up", AuthController.signUpUser);
authRouter.post("/refresh", AuthController.refreshAuth);

module.exports = authRouter;
