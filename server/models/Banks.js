/*module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Banks', {
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cvc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    timestamps: false,
  });
};*/

const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Banks extends Model {}

  Banks.init({
    cardNumber: DataTypes.STRING,
    name: DataTypes.STRING,
    expiry: DataTypes.STRING,
    cvc: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Banks',
  });
  return Banks;
};
