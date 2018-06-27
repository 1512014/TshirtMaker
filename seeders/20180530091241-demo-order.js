'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      var orders = [
          {
			  orderCode: 12345,
              productId: 1,
              productQty: 2,
              status: 'pending',
              subtotal: 40,
			  userId: 1,
			  designId: 1
          },
          {
			  orderCode: 33323,
              productId: 2,
              productQty: 1,
              status: 'pending',
              subtotal: 30,
			  userId: 1,
			  designId: 1
          },
          {
			  orderCode: 33323,
              productId: 4,
              productQty: 3,
              status: 'pending',
              subtotal: 45,
			  userId: 1,
			  designId: 1
          },
          {
			  orderCode: 12345,
              productId: 5,
              productQty: 5,
              status: 'pending',
              subtotal: 100,
			  userId: 3,
			  designId: 1
          },
          {
			  orderCode: 12345,
              productId: 3,
              productQty: 3,
              status: 'pending',
              subtotal: 20,
			  userId: 3,
			  designId: 1
          }
      ];
      return queryInterface.bulkInsert('Orders', orders, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {});
  }
};
