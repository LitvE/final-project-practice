/*const Conversation = require('../models/mongoModels/conversation');
const Message = require('../models/mongoModels/Message');
const Catalog = require('../models/mongoModels/Catalog');*/

const { Conversation, Message, Catalog } = require('../db/models/mongoModels');
//const moment = require('moment');
//const db = require('../db/models');
const { User } = require('../db/models');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
//const _ = require('lodash');

module.exports.addMessage = async (req, res, next) => {
  const { tokenData: { userId, firstName, lastName, displayName, avatar, email }, body: { recipient, messageBody, interlocutor } } = req;

  const participants = [userId, recipient];

  participants.sort(
    (participant1, participant2) => participant1 - participant2);
  try {
    const newConversation = await Conversation.findOneAndUpdate({
      participants,
    },
    { participants, blackList: [false, false], favoriteList: [false, false] },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      useFindAndModify: false,
    });

    const message = new Message({
      sender: userId,
      body: messageBody,
      conversation: newConversation._id,
    });

    await message.save();

    message._doc.participants = participants;

    const interlocutorId = participants.filter(
      (participant) => participant !== userId)[ 0 ];

    const preview = {
      _id: newConversation._id,
      sender: userId,
      text: messageBody,
      createAt: message.createdAt,
      participants,
      blackList: newConversation.blackList,
      favoriteList: newConversation.favoriteList,
    };

    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        _id: newConversation._id,
        sender: userId,
        text: messageBody,
        createAt: message.createdAt,
        participants,
        blackList: newConversation.blackList,
        favoriteList: newConversation.favoriteList,
        interlocutor: {
          id: userId,
          firstName,
          lastName,
          displayName,
          avatar,
          email,
        },
      },
    });

    res.send({
      message,
      preview: Object.assign(preview, { interlocutor }),
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  const { tokenData: { userId }, body: { interlocutorId } } = req;
  const participants = [userId, interlocutorId];
  participants.sort(
    (participant1, participant2) => participant1 - participant2);
  try {
    const messages = await Message.aggregate([
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversation',
          foreignField: '_id',
          as: 'conversationData',
        },
      },
      { $match: { 'conversationData.participants': participants } },
      { $sort: { createdAt: 1 } },
      {
        $project: {
          '_id': 1,
          'sender': 1,
          'body': 1,
          'conversation': 1,
          'createdAt': 1,
          'updatedAt': 1,
        },
      },
    ]);

    const interlocutor = await userQueries.findUser(
      { id: interlocutorId });
    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  const { tokenData: { userId } } = req;
  try {
    const conversations = await Message.aggregate([
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversation',
          foreignField: '_id',
          as: 'conversationData',
        },
      },
      {
        $unwind: '$conversationData',
      },
      {
        $match: {
          'conversationData.participants': userId,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: '$conversationData._id',
          sender: { $first: '$sender' },
          text: { $first: '$body' },
          createAt: { $first: '$createdAt' },
          participants: { $first: '$conversationData.participants' },
          blackList: { $first: '$conversationData.blackList' },
          favoriteList: { $first: '$conversationData.favoriteList' },
        },
      },
    ]);
    const interlocutors = [];
    conversations.forEach(conversation => {
      interlocutors.push(conversation.participants.find(
        (participant) => participant !== userId));
    });
    const senders = await User.findAll({
      where: {
        id: interlocutors,
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });
    conversations.forEach((conversation) => {
      senders.forEach(sender => {
        if (conversation.participants.includes(sender.dataValues.id)) {
          conversation.interlocutor = {
            id: sender.dataValues.id,
            firstName: sender.dataValues.firstName,
            lastName: sender.dataValues.lastName,
            displayName: sender.dataValues.displayName,
            avatar: sender.dataValues.avatar,
          };
        }
      });
    });
    res.send(conversations);
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res) => {
  const { tokenData: { userId }, body: { participants, blackListFlag } } = req;

  const predicate = 'blackList.' +
    participants.indexOf(userId);
  try {
    const chat = await Conversation.findOneAndUpdate(
      { participants },
      { $set: { [ predicate ]: blackListFlag } }, { new: true });
    res.send(chat);
    const interlocutorId = participants.filter(
      (participant) => participant !== userId)[ 0 ];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  } catch (err) {
    res.send(err);
  }
};

module.exports.favoriteChat = async (req, res) => {
  const { tokenData: { userId }, body: { participants, favoriteFlag } } = req;
  const predicate = 'favoriteList.' +
    participants.indexOf(userId);
  try {
    const chat = await Conversation.findOneAndUpdate(
      { participants },
      { $set: { [ predicate ]: favoriteFlag } }, { new: true });
    res.send(chat);
  } catch (err) {
    res.send(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  const { tokenData: { userId }, body: { catalogName, chatId } } = req;

  const catalog = new Catalog({
    userId,
    catalogName,
    chats: [chatId],
  });
  try {
    await catalog.save();
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const { tokenData: { userId }, body: { catalogName, catalogId } } = req;

    const catalog = await Catalog.findOneAndUpdate({
      _id: catalogId,
      userId,
    }, { catalogName }, { new: true });
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  const { tokenData: { userId }, body: { chatId, catalogId } } = req;

  try {
    const catalog = await Catalog.findOneAndUpdate({
      _id: catalogId,
      userId,
    }, { $addToSet: { chats: chatId } }, { new: true });
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  const { tokenData: { userId }, body: { chatId, catalogId } } = req;

  try {
    const catalog = await Catalog.findOneAndUpdate({
      _id: catalogId,
      userId,
    }, { $pull: { chats: chatId } }, { new: true });
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  const { tokenData: { userId }, body: { catalogId } } = req;
  try {
    await Catalog.remove(
      { _id: catalogId, userId });
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  const { tokenData: { userId } } = req;

  try {
    const catalogs = await Catalog.aggregate([
      { $match: { userId } },
      {
        $project: {
          _id: 1,
          catalogName: 1,
          chats: 1,
        },
      },
    ]);
    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};
