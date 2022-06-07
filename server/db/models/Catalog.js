'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    static associate(models) {
      Catalog.belongsTo(models.User, {
        foreignKey: {
          field: 'userId',
        },
      });
    }
  };
  Catalog.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      }
    },
    catalogName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chats: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Catalog',
  });
  return Catalog;
};