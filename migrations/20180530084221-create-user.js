'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: { type: Sequelize.STRING, allowNull: false },
      lastName: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      rememberToken: { type: Sequelize.STRING, allowNull: true },
      role: { type: Sequelize.INTEGER, allowNull: false },
      gender: { type: Sequelize.INTEGER, allowNull: false },
      phoneNumber: { type: Sequelize.STRING, allowNull: false },
      country: { type: Sequelize.STRING(50), allowNull: false },
      city: { type: Sequelize.STRING(50), allowNull: false },
      address: { type: Sequelize.STRING(512), allowNull: false },
      isActive: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
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
    return queryInterface.dropTable('Users');
  }
};
