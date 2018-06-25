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
      name: { type: Sequelize.STRING, allowNull: false },
	  gender: { type: Sequelize.STRING, allowNull: false, defaultValue: 'male' },
	  templateFront: { type: Sequelize.STRING, allowNull: false},
  	  templateBack: { type: Sequelize.STRING, allowNull: false},
	  basicPrice: { type: Sequelize.FLOAT(11, 2), allowNull: false }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Product_types');
  }
};
