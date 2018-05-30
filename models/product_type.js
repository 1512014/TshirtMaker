'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product_type = sequelize.define('Product_type', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true }

  }, {});

  Product_type.associate = function(models) {
    // associations can be defined here
    Product_type.hasMany(models.Product);
    Product_type.belongsTo(models.Category);


  };
  return Product_type;
};
