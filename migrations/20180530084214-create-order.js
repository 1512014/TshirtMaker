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
	  orderCode: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      productId: { type: Sequelize.INTEGER, allowNull: false },
      productQty: { type: Sequelize.INTEGER, allowNull: false},
      status: { type: Sequelize.STRING, allowNull: false },
      userId: { type: Sequelize.INTEGER, allowNull: false },
    designId: { type: Sequelize.INTEGER, allowNull: false },
    payment_method: { type: Sequelize.STRING, allowNull: true },
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
