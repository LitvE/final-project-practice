const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.User, {
        foreignKey:{
          field: 'userId',
        },
      });
      Rating.belongsTo(models.Offer, {
        foreignKey: {
          field: 'offerId',
        },
      });
    }
  }
  Rating.init({
    offerId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'Offers',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    mark: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};
