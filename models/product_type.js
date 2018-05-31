'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product_type = sequelize.define('Product_type', {
    name: { type: DataTypes.STRING, allowNull: false }
  }, {});

  Product_type.associate = function(models) {
    // associations can be defined here

  };
  return Product_type;
};
