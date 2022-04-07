const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    checkPassword(value) {
      return compare(value, this.getDataValue("password"));
    }

    static associate(models) {
      User.hasMany(models.Contest, {
        foreignKey: {
          field: "userId",
        },
      });

      User.hasMany(models.Offer, {
        foreignKey: {
          field: "userId",
        },
      });

      User.hasMany(models.Rating, {
        foreignKey: {
          field: "userId",
        },
      });
      User.hasMany(models.RefreshToken, {
        foreignKey: {
          field: "userId",
        },
      });
    }
  }

  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      displayName: DataTypes.STRING,
      password: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "anon.png",
      },
      role: DataTypes.ENUM("customer", "creator"),
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
