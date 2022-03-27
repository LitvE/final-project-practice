

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', {
      firstName: 'John',
      lastName: 'Dow',
      displayName: 'John',
      password: '$2b$05$HFawWk6yTFERYmcOlsWbPu2HyRVoyzqei6yOwskdNA3Q.VzodMsT6',
      email: 'jdow@gmail.com',
    });
  },

  down: async (queryInterface, Sequelize) => {
  /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  },
};
