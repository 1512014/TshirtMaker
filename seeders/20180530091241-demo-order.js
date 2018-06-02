'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      var orders = [
          // {
          //     name: "Trending"
          // },
          // {
          //     name: "Sport"
          // },
          // {
          //     name: "Uniform"
          // }
      ];
      // return queryInterface.bulkInsert('Orders', orders, {});
  },

  down: (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('Orders', null, {});
  }
};
