//const { Conversation, Message, Catalog } = require('../db/models/mongoModels');
const { User, Conversation, Message, Catalog } = require("../db/models");
const userQueries = require("./queries/userQueries");
const controller = require("../socketInit");
const { errorLogging } = require("../utils/logFunction");
const { Op } = require("sequelize");

//MongoDB
/*module.exports.addMessage = async (req, res, next) => {
  const { tokenData: { id, firstName, lastName, displayName, avatar, email }, body: { recipient, messageBody, interlocutor } } = req;

  const participants = [id, recipient];

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
      sender: id,
      body: messageBody,
      conversation: newConversation._id,
    });

    await message.save();

    message._doc.participants = participants;

    const interlocutorId = participants.filter(
      (participant) => participant !== id)[ 0 ];

    const preview = {
      _id: newConversation._id,
      sender: id,
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
        sender: id,
        text: messageBody,
        createAt: message.createdAt,
        participants,
        blackList: newConversation.blackList,
        favoriteList: newConversation.favoriteList,
        interlocutor: {
          id,
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
    errorLogging(err);
    next(err);
  }
};*/

//SQL
module.exports.addMessage = async (req, res, next) => {
  const {
    tokenData: { id, firstName, lastName, displayName, avatar, email },
    body: { recipient, messageBody, interlocutor },
  } = req;

  let participant1;
  let participant2;
  if (id < recipient) {
    participant1 = id;
    participant2 = recipient;
  } else {
    participant1 = recipient;
    participant2 = id;
  }

  try {
    const newConversation = await Conversation.findOrCreate({
      where: {
        participant1,
        participant2,
      },
      defaults: {
        participant1,
        participant2,
        blackList: [false, false],
        favoriteList: [false, false],
      },
    });

    const message = await Message.create({
      sender: id,
      body: messageBody,
      conversation_id: newConversation[0].dataValues.id,
    });

    message.dataValues.participant1 = participant1;
    message.dataValues.participant2 = participant2;

    const interlocutorId = recipient;

    const preview = {
      id: newConversation[0].dataValues.id,
      sender: id,
      text: messageBody,
      createAt: message.createdAt,
      participant1: participant1,
      participant2: participant2,
      blackList: newConversation[0].dataValues.blackList,
      favoriteList: newConversation[0].dataValues.favoriteList,
      interlocutor: {
        id,
        firstName,
        lastName,
        displayName,
        avatar,
        email,
      },
    };

    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview,
    });
    
    res.send({
      message,
      preview,
    });
  } catch (err) {
    errorLogging(err);
    next(err);
  }
};

//MongoDB
/*module.exports.getChat = async (req, res, next) => {
  const { tokenData: { id }, body: { interlocutorId } } = req;
  const participants = [id, interlocutorId];
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
    errorLogging(err);
    next(err);
  }
};*/

//SQL
module.exports.getChat = async (req, res, next) => {
  const {
    tokenData: { id },
    body: { interlocutorId },
  } = req;
  let participant1;
  let participant2;
  if (id < interlocutorId) {
    participant1 = id;
    participant2 = interlocutorId;
  } else {
    participant1 = interlocutorId;
    participant2 = id;
  }
  try {
    const messages = await Message.findAll({
      where: {
        "$Conversation.participant1$": participant1,
        "$Conversation.participant2$": participant2,
      },
      include: [
        {
          model: Conversation,
        },
      ],
      attributes: [
        "id",
        "sender",
        "body",
        "conversation_id",
        "createdAt",
        "updatedAt",
      ],
    });

    const interlocutor = await userQueries.findUser({ id: interlocutorId });

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
    errorLogging(err);
    next(err);
  }
};

//MongoDB
/*module.exports.getPreview = async (req, res, next) => {
  const { tokenData: { id } } = req;
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
          'conversationData.participants': id,
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
        (participant) => participant !== id));
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
    //getWordsCount();
    res.send(conversations);
  } catch (err) {
    errorLogging(err);
    next(err);
  }
};*/

//SQL
module.exports.getPreview = async (req, res, next) => {
  const {
    tokenData: { id },
  } = req;
  try {
    const conversations = await Conversation.findAll({
      include: {
        model: Message,
      },
      where: {
        [Op.or]: [{ participant1: id }, { participant2: id }],
      },
      order: [[{ model: Message }, "createdAt", "DESC"]],
    });

    const interlocutors = [];
    conversations.forEach((conversation) => {
      if (conversation.participant1 === id) {
        interlocutors.push(conversation.participant2);
      } else {
        interlocutors.push(conversation.participant1);
      }
    });

    const senders = await User.findAll({
      where: {
        id: interlocutors,
      },
      attributes: ["id", "firstName", "lastName", "displayName", "avatar"],
    });

    conversations.forEach((conversation) => {
      senders.forEach((sender) => {
        if (
          conversation.participant1 === sender.dataValues.id ||
          conversation.participant2 === sender.dataValues.id
        ) {
          conversation.dataValues.interlocutor = {
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
    errorLogging(err);
    next(err);
  }
};

//MongoDB
/*module.exports.blackList = async (req, res) => {
  const { tokenData: { id }, body: { participants, blackListFlag } } = req;

  const predicate = 'blackList.' +
    participants.indexOf(id);
  try {
    const chat = await Conversation.findOneAndUpdate(
      { participants },
      { $set: { [ predicate ]: blackListFlag } }, { new: true });
    res.send(chat);
    const interlocutorId = participants.filter(
      (participant) => participant !== id)[ 0 ];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  } catch (err) {
    errorLogging(err);
    res.send(err);
  }
};*/

//SQL
module.exports.blackList = async (req, res) => {
  const {
    tokenData: { id },
    body: { participant1, participant2, blackListFlag },
  } = req;

  try {
    const chat = await Conversation.findOne({
      where: {
        participant1,
        participant2,
      },
    });

    if (chat.participant1 === id) {
      chat.blackList[0] = blackListFlag;
    } else {
      chat.blackList[1] = blackListFlag;
    }

    await chat.save();

    res.send(chat);

    if (senderId !== id) {
      controller.getChatController().emitChangeBlockStatus(senderId, chat);
    } else {
      controller.getChatController().emitChangeBlockStatus(recipientId, chat);
    }
  } catch (err) {
    errorLogging(err);
    res.send(err);
  }
};

//MongoDB
/*module.exports.favoriteChat = async (req, res) => {
  const { tokenData: { id }, body: { participants, favoriteFlag } } = req;
  const predicate = 'favoriteList.' + participants.indexOf(id);
  try {
    const chat = await Conversation.findOneAndUpdate(
      { participants },
      { $set: { [ predicate ]: favoriteFlag } }, { new: true });
    res.send(chat);
  } catch (err) {
    errorLogging(err);
    res.send(err);
  }
};*/

//SQL
module.exports.favoriteChat = async (req, res) => {
  const {
    tokenData: { id },
    body: { participant1, participant2, favoriteFlag },
  } = req;

  try {
    const chat = await Conversation.findOne({
      where: {
        participant1,
        participant2,
      },
    });

    if (participant1 === id) {
      chat.favoriteList[0] = favoriteFlag;
    } else {
      chat.favoriteList[1] = favoriteFlag;
    }

    await chat.save();

    res.send(chat);
  } catch (err) {
    errorLogging(err);
    res.send(err);
  }
};

//MongoDB
/*module.exports.createCatalog = async (req, res, next) => {
  const { tokenData: { id }, body: { catalogName, chatId } } = req;

  const catalog = new Catalog({
    userId: id,
    catalogName,
    chats: [chatId],
  });
  try {
    
    await catalog.save();
    res.send(catalog);
  } catch (err) {
    errorLogging(err);
    next(err);
  }
};*/

//SQL
module.exports.createCatalog = async (req, res, next) => {
  const {
    tokenData: { id },
    body: { catalogName, chatId },
  } = req;

  try {
    const catalog = await Catalog.create({
      userId: id,
      catalogName,
      chats: [chatId],
    });
    res.send(catalog);
  } catch (err) {
    errorLogging(err);
    next(err);
  }
};

//MongoDB
/*module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const { tokenData: { id }, body: { catalogName, catalogId } } = req;

    const catalog = await Catalog.findOneAndUpdate({
      _id: catalogId,
      userId: id,
    }, { catalogName }, { new: true });
    res.send(catalog);
  } catch (err) {
    errorLogging(err);
    next(err);
  }
};*/

//SQL
module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const {
      tokenData: { id },
      body: { catalogName, catalogId },
    } = req;

    const catalog = await Catalog.findOne({
      _id: catalogId,
      userId: id,
    });
    catalog.catalogName = catalogName;
    await catalog.save();

    res.send(catalog);
  } catch (err) {
    errorLogging(err);
    next(err);
  }
};

//MongoDB
/*module.exports.addNewChatToCatalog = async (req, res, next) => {
  const { tokenData: { id }, body: { chatId, catalogId } } = req;

  try {
    const catalog = await Catalog.findOneAndUpdate({
      _id: catalogId,
      userId: id,
    }, { $addToSet: { chats: chatId } }, { new: true });
    res.send(catalog);
  } catch (err) {
    errorLogging(err);
    next(err);
  }
};*/

//SQL
module.exports.addNewChatToCatalog = async (req, res, next) => {
  const {
    tokenData: { id },
    body: { chatId, catalogId },
  } = req;

  try {
    const catalog = await Catalog.findOne({
      _id: catalogId,
      userId: id,
    });
    catalog.chats.push(chatId);
    await catalog.save();

    res.send(catalog);
  } catch (err) {
    errorLogging(err);
    next(err);
  }
};

//MongoDB
/*module.exports.removeChatFromCatalog = async (req, res, next) => {
  const { tokenData: { id }, body: { chatId, catalogId } } = req;

  try {
    const catalog = await Catalog.findOneAndUpdate({
      _id: catalogId,
      userId: id,
    }, { $pull: { chats: chatId } }, { new: true });
    res.send(catalog);
  } catch (err) {
    errorLogging(err);
    next(err);
  }
};*/

//SQL
module.exports.removeChatFromCatalog = async (req, res, next) => {
  const {
    tokenData: { id },
    body: { chatId, catalogId },
  } = req;

  try {
    const catalog = await Catalog.findOne({
      _id: catalogId,
      userId: id,
    });
    const index = catalog.chats.indexOf(chatId);
    catalog.chats.slice(index, 1);
    await catalog.save();

    res.send(catalog);
  } catch (err) {
    errorLogging(err);
    next(err);
  }
};

//MongoDB
/*module.exports.deleteCatalog = async (req, res, next) => {
  const { tokenData: { id }, body: { catalogId } } = req;
  try {
    await Catalog.remove(
      { _id: catalogId, userId: id });
    res.end();
  } catch (err) {
    errorLogging(err);
    next(err);
  }
};*/

//SQL
module.exports.deleteCatalog = async (req, res, next) => {
  const {
    tokenData: { id },
    body: { catalogId },
  } = req;
  try {
    await Catalog.destroy({
      where: {
        id: catalogId,
      },
    });
    res.end();
  } catch (err) {
    errorLogging(err);
    next(err);
  }
};

//MongoDB
/*module.exports.getCatalogs = async (req, res, next) => {
  const { tokenData: { id } } = req;

  try {
    const catalogs = await Catalog.aggregate([
      { $match: { userId: id } },
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
    errorLogging(err);
    next(err);
  }
};*/

//SQL
module.exports.getCatalogs = async (req, res, next) => {
  const {
    tokenData: { id },
  } = req;

  try {
    const catalogs = await Catalog.findAll({
      where: {
        userId: id,
      },
      attributes: ["id", "catalogName", "chats"],
    });

    res.send(catalogs);
  } catch (err) {
    errorLogging(err);
    next(err);
  }
};

const getWordsCount = async () => {
  try {
    const wordCount = await Message.aggregate([
      {
        $match: { body: /паровоз/ },
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    console.dir(wordCount);
  } catch (error) {
    errorLogging(err);
    //console.log(error);
  }
};
