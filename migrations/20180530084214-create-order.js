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
      status: { type: Sequelize.STRING, allowNull: false },
      subtotal: { type: Sequelize.FLOAT(11, 2), allowNull: false },
      shipping: { type: Sequelize.FLOAT(11, 2), defaultValue: 0},
      userId: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:  Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:  Sequelize.literal('NOW()')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};
