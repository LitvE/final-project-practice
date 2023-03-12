const express = require('express');

const checkToken = require('../middlewares/checkToken');
const chatController = require('../controllers/chatController');
const chatRouter = express.Router();

//chatRouter
chatRouter.post(
  '/newMessage',
  checkToken.checkToken,
  chatController.addMessage,
);

chatRouter.get(
  '/getChat',
  checkToken.checkToken,
  chatController.getChat,
);

chatRouter.get(
  '/getPreview',
  checkToken.checkToken,
  chatController.getPreview,
);

chatRouter.put(
  '/blackList',
  checkToken.checkToken,
  chatController.blackList,
);

chatRouter.put(
  '/favorite',
  checkToken.checkToken,
  chatController.favoriteChat,
);

chatRouter.post(
  '/createCatalog',
  checkToken.checkToken,
  chatController.createCatalog,
);

chatRouter.patch(
  '/updateNameCatalog',
  checkToken.checkToken,
  chatController.updateNameCatalog,
);

chatRouter.post(
  '/addNewChatToCatalog',
  checkToken.checkToken,
  chatController.addNewChatToCatalog,
);

chatRouter.patch(
  '/removeChatFromCatalog',
  checkToken.checkToken,
  chatController.removeChatFromCatalog,
);

chatRouter.delete(
  '/deleteCatalog',
  checkToken.checkToken,
  chatController.deleteCatalog,
);

chatRouter.get(
  '/getCatalogs',
  checkToken.checkToken,
  chatController.getCatalogs,
);


module.exports = chatRouter;
