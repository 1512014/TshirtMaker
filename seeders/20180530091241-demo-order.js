'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      var orders = [
          {
              product_id: 1,
              product_qty: 2,
              product_size: 2, //size S
              status: 1,
              subtotal: 40,
              tax: 5,
              extras_id: "[2,3]"
          },
          {
              product_id: 2,
              product_qty: 1,
              product_size: 2, //size S
              status: 1,
              subtotal: 30,
              tax: 5,
              extras_id: "[1,3]"
          },
          {
              product_id: 4,
              product_qty: 3,
              product_size: 2, //size S
              status: 1,
              subtotal: 45,
              tax: 5,
              extras_id: "[1,2]"
          },
          {
              product_id: 5,
              product_qty: 5,
              product_size: 6, //size S
              status: 1,
              subtotal: 100,
              tax: 5,
              extras_id: "[1,2,3]"
          },
          {
              product_id: 3,
              product_qty: 3,
              product_size: 2, //size S
              status: 1,
              subtotal: 20,
              tax: 5,
              extras_id: "[2,3]"
          }
      ];
      return queryInterface.bulkInsert('Orders', orders, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {});
  }
};
