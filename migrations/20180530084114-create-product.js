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
      name: { type: Sequelize.STRING, allowNull: false},
      //model_id
      typeId: {
          type: Sequelize.INTEGER,
          // references: {
          //   model: 'Product_type',
          //   key: 'id'
          //   },
           allowNull: false
      },
      qty: { type: Sequelize.BIGINT(11), allowNull: false, defaultValue: 1 },
      minSize: { type: Sequelize.INTEGER, defaultValue: 0},
      maxSize: { type: Sequelize.INTEGER, defaultValue: 7},
      imagePath1: { type: Sequelize.STRING, allowNull: false},
      imagePath2: { type: Sequelize.STRING, allowNull: true},
      // imagePath3: { type: Sequelize.STRING, allowNull: true},
      // imagePath4: { type: Sequelize.STRING, allowNull: true},
      color: { type: Sequelize.STRING, allowNull: true, defaultValue: "#ffffff"},
      price: { type: Sequelize.FLOAT(11, 2), allowNull: false },
      discount: { type: Sequelize.FLOAT(3, 0), defaultValue: 0},
      description: { type: Sequelize.STRING(512), allowNull: true },
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
