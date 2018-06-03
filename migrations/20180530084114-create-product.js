'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      types_id: {
        allowNull: true,
        type: Sequelize.STRING
      },
      qty: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      minSize: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      maxSize: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      imagePath1: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imagePath2: {
        allowNull: true,
        type: Sequelize.STRING
      },
      imagePath3: {
        allowNull: true,
        type: Sequelize.STRING
      },
      imagePath4: {
        allowNull: true,
        type: Sequelize.STRING
      },
      color: {
        allowNull: true,
        type: Sequelize.STRING
      },
      brand: {
        allowNull: true,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      discount: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
      description: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      review: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
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
    return queryInterface.dropTable('Products');
  }
};