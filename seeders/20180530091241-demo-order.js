'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      var orders = [
          {
              productId: 1,
              productQty: 2,
              productSize: 2, //size S
              status: 'pending',
              subtotal: 40,
			  userId: 1

          },
          {
              productId: 2,
              productQty: 1,
              productSize: 2, //size S
              status: 'pending',
              subtotal: 30,
			  userId: 1
          },
          {
              productId: 4,
              productQty: 3,
              productSize: 2, //size S
              status: 'pending',
              subtotal: 45,
			  userId: 1
          },
          {
              productId: 5,
              productQty: 5,
              productSize: 6, //size S
              status: 'pending',
              subtotal: 100,
			  userId: 3
          },
          {
              productId: 3,
              productQty: 3,
              productSize: 2, //size S
              status: 'pending',
              subtotal: 20,
			  userId: 3
          }
      ];
      return queryInterface.bulkInsert('Orders', orders, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {});
  }
};
