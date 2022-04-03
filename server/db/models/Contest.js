/*module.exports = (sequelize, DataTypes) => {
  const Contest = sequelize.define('Contests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    orderId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    contestType: {
      allowNull: false,
      type: DataTypes.ENUM('name', 'tagline', 'logo'),
    },
    fileName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    originalFileName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    title: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    typeOfName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    industry: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    focusOfWork: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    targetCustomer: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    styleName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    nameVenture: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    typeOfTagline: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    brandStyle: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prize: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    priority: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  });

  return Contest;
};*/

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
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        },
      });
    }
  }
  Contest.init({
    orderId: DataTypes.STRING,
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
    brandStyle: DataTypes.STRING,
    status: DataTypes.STRING,
    prize: DataTypes.DECIMAL,
    priority:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Contest',
  });
  return Contest;
};
