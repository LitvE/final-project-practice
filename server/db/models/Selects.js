const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Select extends Model {}

  Select.init({
    type: DataTypes.STRING,
    describe: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Select',
  });
  return Select;
};
