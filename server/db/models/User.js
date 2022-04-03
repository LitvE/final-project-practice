// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('Users', {
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: DataTypes.INTEGER,
//     },
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     displayName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     avatar: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       defaultValue: 'anon.png',
//     },
//     role: {
//       type: DataTypes.ENUM('customer', 'creator'),
//       allowNull: false,
//     },
//     balance: {
//       type: DataTypes.DECIMAL,
//       allowNull: false,
//       defaultValue: 0,
//       validate: {
//         min: 0,
//       },
//     },
//     accessToken: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     rating: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//       defaultValue: 0,
//     },
//   },
//   {
//     timestamps: false,
//   });

//   User.associate = function (models) {
//     User.hasMany(models.Order, { foreignKey: 'user_id', targetKey: 'id' });
//   };

//   User.associate = function (models) {
//     User.hasMany(models.Participant,
//       { foreignKey: 'user_id', targetKey: 'id' });
//   };

//   User.associate = function (models) {
//     User.hasMany(models.Offer, { foreignKey: 'user_id', targetKey: 'id' });
//   };

//   User.associate = function (models) {
//     User.hasMany(models.RefreshToken,
//       { foreignKey: 'user_id', targetKey: 'id' });
//   };

//   return User;
// };


const {  Model } = require('sequelize');
//const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //User.hasMany(models.Order, { foreignKey: 'user_id', targetKey: 'id' });
      //User.hasMany(models.Participant, { foreignKey: 'user_id', targetKey: 'id' });
      //User.hasMany(models.Offer, { foreignKey: 'user_id', targetKey: 'id' });
      //User.hasMany(models.RefreshToken, { foreignKey: 'user_id', targetKey: 'id' });
      User.hasMany(models.Contest, {
        foreignKey: {
          field: 'userId',
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        },
      });

      User.hasMany(models.Offer, {
        foreignKey: {
          field: 'userId',
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        },
      });

      User.hasMany(models.Rating, {
        foreignKey: {
          field: 'userId',
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        },
      });
      User.hasMany(models.Token, {
        foreignKey: {
          field: 'userId',
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        },
      });
    }
  }

  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    displayName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    role: DataTypes.ENUM('customer', 'creator'),
    balance: DataTypes.DECIMAL,
    accessToken: DataTypes.TEXT,
    rating: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
