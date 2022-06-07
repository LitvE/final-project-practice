'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Conversations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      participant1: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      participant2: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      blackList: {
        type: Sequelize.ARRAY(Sequelize.BOOLEAN),
        allowNull: false
      },
      favoriteList: {
        type: Sequelize.ARRAY(Sequelize.BOOLEAN),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Conversations');
  }
};