const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate(models) {
      RefreshToken.belongsTo(models.User, {
        foreignKey: {
          field: "userId",
        },
      });
    }
  }

  RefreshToken.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        refernces: {
          model: "Users",
          key: "id",
        },
      },
      token: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        unique: true,
      },
      expiredIn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      userAgent: DataTypes.STRING,
      fingerprint: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "RefreshToken",
    }
  );
  return RefreshToken;
};
