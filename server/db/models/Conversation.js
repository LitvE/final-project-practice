'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate(models) {
      Conversation.hasMany(models.Message,{
        foreignKey: {
          field: "conversation_id",
        }
      })
    }
  };
  Conversation.init({
    participant1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    participant2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    blackList: {
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      allowNull: false,
    },
    favoriteList: {
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Conversation',
  });
  return Conversation;
};