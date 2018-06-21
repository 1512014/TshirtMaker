'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var productTypes = [
        {
            id: "1",
            name: "Short Sleeve"
        },
        {
            id: "2",
            name: "Long Sleeve"
        },
        {
            id: "3",
            name: "Tank Tops & Sleeveless"
        },
        {
            id: "4",
            name: "Hoodies"
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
