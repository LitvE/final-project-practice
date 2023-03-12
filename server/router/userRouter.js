const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const validators = require('../middlewares/validators');
const userController = require('../controllers/userController');
const checkToken = require('../middlewares/checkToken');
const upload = require('../utils/fileUpload');

const userRouter = express.Router();


userRouter.put(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark,
);

userRouter.put(
  '/updateUser',
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser,
);


userRouter.post(
  '/pay',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);

userRouter.post(
  '/cashout',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashout,
);

userRouter.get(
  '/getUser',
  checkToken.checkAuth,
);

module.exports = userRouter;
