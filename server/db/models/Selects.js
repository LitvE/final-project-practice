// module.exports = (sequelize, DataTypes) => {
//   const SelectBox = sequelize.define('Selects', {
//     type: {
//       allowNull: false,
//       primaryKey: true,
//       type: DataTypes.STRING,
//     },
//     describe: {
//       allowNull: false,
//       primaryKey: true,
//       type: DataTypes.STRING,
//     },
//   },
//   {
//     timestamps: false,
//   });

//   return SelectBox;
// };

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
