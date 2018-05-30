'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    //model_id
    //extra_id
    //type_id
    qty: { type: DataTypes.BIGINT(11), allowNull: false, defaultValue: 1 },
    imagePath: { type: DataTypes.STRING, allowNull: false},
    price: { type: DataTypes.FLOAT(11, 2), allowNull: false },
    discount: { type: DataTypes.FLOAT(3, 0), defaultValue: 0},
    description: { type: DataTypes.STRING(512), allowNull: false, unique: true },
    review: { type: DataTypes.FLOAT(3, 1)}
  }, {});

  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Product_type);
    // Product.hasMany(models.Design_model);
    // Product.hasMany(models.Extra);
  };

  return Product;
};
