'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Design_models', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      texts: { type: Sequelize.STRING, allowNull: true},
      imageFront: { type: Sequelize.STRING, allowNull: true},
	  imageBack: { type: Sequelize.STRING, allowNull: true},
      size: { type: Sequelize.STRING(11), defaultValue: 0},
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
    return queryInterface.dropTable('Design_models');
  }
};
