'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var extras = [
      {
        name: "Fast Shipping",
        price: 5
      },
      {
        name: "Cotton Cover",
        price: 3
      },
      {
        name: "Souvenir Cover",
        price: 10
      }
    ];
    return queryInterface.bulkInsert('Extras', extras, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Extras', null, {});
  }
};
