'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product_extra = sequelize.define('Product_extra', {
  }, {});
  Product_extra.associate = function(models) {
    // associations can be defined here
    Product_extra.belongsTo(models.Product);
    Product_extra.belongsTo(models.Extra);
  };
  return Product_extra;
};
