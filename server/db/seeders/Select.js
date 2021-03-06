module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Selects', [
      {
        id: 1,
        type: 'typeOfName',
        describe: 'Company',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        type: 'typeOfName',
        describe: 'Product',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        type: 'typeOfName',
        describe: 'Project',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        type: 'nameStyle',
        describe: 'Classic',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        type: 'nameStyle',
        describe: 'Fun',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        type: 'nameStyle',
        describe: 'Professional',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        type: 'nameStyle',
        describe: 'Descriptive',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        type: 'nameStyle',
        describe: 'Youthful',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        type: 'nameStyle',
        describe: 'Any',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        type: 'typeOfTagline',
        describe: 'Classic',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        type: 'typeOfTagline',
        describe: 'Fun',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        type: 'typeOfTagline',
        describe: 'Powerful',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        type: 'typeOfTagline',
        describe: 'Descriptive',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        type: 'typeOfTagline',
        describe: 'Modern',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        type: 'typeOfTagline',
        describe: 'Any',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        type: 'brandStyle',
        describe: 'Techy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        type: 'brandStyle',
        describe: 'Fun',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        type: 'brandStyle',
        describe: 'Fancy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        type: 'brandStyle',
        describe: 'Minimal',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        type: 'brandStyle',
        describe: 'Brick & Mortar',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 21,
        type: 'brandStyle',
        describe: 'Photo-based',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 22,
        type: 'industry',
        describe: 'Creative Agency',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 23,
        type: 'industry',
        describe: 'Consulting Firm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 24,
        type: 'industry',
        describe: 'Skin care',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 25,
        type: 'industry',
        describe: 'Biotech',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 26,
        type: 'industry',
        describe: 'Publisher',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 27,
        type: 'industry',
        describe: 'Education',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 28,
        type: 'industry',
        describe: 'Footwear',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 29,
        type: 'industry',
        describe: 'Medical',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 30,
        type: 'industry',
        describe: 'Builders',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Selects', null, {});
  },
};
