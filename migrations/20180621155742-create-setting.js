'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
	  key: { type: Sequelize.STRING, allowNull: false },
  	  value: { type: Sequelize.FLOAT(2, 1), allowNull: false }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Settings');
  }
};
