const express = require("express");
const validators = require('../middlewares/validators');
const hashPass = require('../middlewares/hashPassMiddle');
const AuthController = require("./../controllers/authController");
const authRouter = express.Router();

authRouter.post("/sign-in", validators.validateLogin, AuthController.signInUser);
authRouter.post("/sign-up", validators.validateRegistrationData,
hashPass, AuthController.signUpUser);
authRouter.post("/refresh", AuthController.refreshAuth);

module.exports = authRouter;
