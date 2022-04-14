module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("RefreshTokens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refernces: {
          model: "Users",
          key: "id",
        },
      },
      token: {
        type: Sequelize.STRING(1024),
        allowNull: false,
        unique: true,
      },
      expiredIn: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fingerprint: {
        type: Sequelize.STRING,
      },
      userAgent: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("RefreshTokens");
  },
};
