const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Contest extends Model {
    static associate(models) {
      // define association here
      Contest.belongsTo(models.User, {
        foreignKey: {
          field: 'userId',
        },
      });
      Contest.hasMany(models.Offer, {
        foreignKey: {
          field: 'contestId',
        },
      });
    }
  }
  Contest.init({
    contestType: DataTypes.ENUM('name', 'tagline', 'logo'),
    fileName: DataTypes.STRING,
    originalFileName: DataTypes.STRING,
    title: DataTypes.STRING,
    typeOfName: DataTypes.STRING,
    industry: DataTypes.STRING,
    focusOfWork: DataTypes.TEXT,
    targetCustomer: DataTypes.TEXT,
    styleName: DataTypes.STRING,
    nameVenture: DataTypes.STRING,
    typeOfTagline: DataTypes.STRING,
    status: DataTypes.STRING,
    brandStyle: DataTypes.STRING,
    prize: DataTypes.DECIMAL,
    priority:DataTypes.INTEGER,
    orderId: DataTypes.STRING,
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Contest',
  });
  return Contest;
};
