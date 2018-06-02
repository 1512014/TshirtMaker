'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      var orderStatuses = [
          {
              name: "Pendding"
          },
          {
              name: "Processing"
          },
          {
              name: "Deliverd"
          }
      ];
      return queryInterface.bulkInsert('Order_statuses', orderStatuses, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Order_statuses', null, {});
  }
};
