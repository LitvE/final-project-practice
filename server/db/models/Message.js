'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.Conversation, {
        foreignKey: {
          field: 'coversation_id',
        },
      });
    }
  };
  Message.init({
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    conversation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Conversarions',
        key: 'id',
      },
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};