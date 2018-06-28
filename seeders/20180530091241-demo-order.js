'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      var orders = [
          {
			  orderCode: 12345,
              productId: 1,
              productQty: 2,
              status: 'pending',
			  userId: 2,
			  designId: 1
          },
          {
			  orderCode: 33323,
              productId: 2,
              productQty: 1,
              status: 'pending',
			  userId: 2,
			  designId: 1
          },
          {
			  orderCode: 33323,
              productId: 4,
              productQty: 3,
              status: 'pending',
			  userId: 2,
			  designId: 1
          },
		  {
			  orderCode: 22222,
              productId: 1,
              productQty: 2,
              status: 'processing',
			  userId: 2,
			  designId: 1
          },
          {
			  orderCode: 44444,
              productId: 2,
              productQty: 1,
              status: 'processing',
			  userId: 2,
			  designId: 1
          },
          {
			  orderCode: 44444,
              productId: 4,
              productQty: 3,
              status: 'processing',
			  userId: 2,
			  designId: 1
          },
          {
			  orderCode: 12345,
              productId: 5,
              productQty: 5,
              status: 'pending',
			  userId: 3,
			  designId: 1
          },
          {
			  orderCode: 12345,
              productId: 3,
              productQty: 3,
              status: 'pending',
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
