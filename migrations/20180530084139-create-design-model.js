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
      imagesPath: { type: Sequelize.STRING, allowNull: true},
      color: { type: Sequelize.STRING(11), defaultValue: 0},
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
