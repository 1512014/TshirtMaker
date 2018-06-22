'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Product_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: { type: Sequelize.STRING, allowNull: false }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Product_types');
  }
};
