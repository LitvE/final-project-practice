const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    static associate(models) {
      Offer.belongsTo(models.User, {
        foreignKey: {
          field: 'userId',
        },
      });
      Offer.belongsTo(models.Contest, {
        foreignKey: {
          field: 'contestId',
        },
      });
      Offer.hasOne(models.Rating, {
        foreignKey: {
          field: 'offerId',
        },
      });
    }
  }
  Offer.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    contestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Contests',
        key: 'id',
      },
    },
    text: DataTypes.STRING,
    fileName: DataTypes.STRING,
    originalFileName: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Offer',
  });
  return Offer;
};
