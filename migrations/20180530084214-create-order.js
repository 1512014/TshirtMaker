'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: { type: Sequelize.INTEGER, allowNull: false },
      productQty: { type: Sequelize.INTEGER, allowNull: false},
      productSize: { type: Sequelize.INTEGER, allowNull: false},
      status: { type: Sequelize.INTEGER, allowNull: false },
      subtotal: { type: Sequelize.FLOAT(11, 2), allowNull: false },
      tax: { type: Sequelize.FLOAT(2, 1), allowNull: false },
      shipping: { type: Sequelize.FLOAT(11, 2), defaultValue: 0},
      userId: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};
