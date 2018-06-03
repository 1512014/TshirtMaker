'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var productTypes = [
        {
            name: "Trending",
            createdAt: Sequelize.literal('NOW()'),
            updatedAt: Sequelize.literal('NOW()')
        },
        {
            name: "Sport",
            createdAt: Sequelize.literal('NOW()'),
            updatedAt: Sequelize.literal('NOW()')
        },
        {
            name: "Uniform",
            createdAt: Sequelize.literal('NOW()'),
            updatedAt: Sequelize.literal('NOW()')
        }
    ];
    return queryInterface.bulkInsert('Product_types', productTypes, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Product_types', null, {});
  }
};
