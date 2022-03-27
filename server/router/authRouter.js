const express = require('express');
const validators = require('../middlewares/validators');
const userController = require('../controllers/userController');
const hashPass = require('../middlewares/hashPassMiddle');
const authRouter = express.Router();

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


module.exports = authRouter;
