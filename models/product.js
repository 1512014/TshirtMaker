'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false},
    //modelId
    typeId: { type: DataTypes.INTEGER, allowNull: false},
    qty: { type: DataTypes.BIGINT(11), allowNull: false, defaultValue: 1 },
    minSize: { type: DataTypes.INTEGER},
    maxSize: { type: DataTypes.INTEGER},
    imagePath1: { type: DataTypes.STRING, allowNull: false},
    imagePath2: { type: DataTypes.STRING, allowNull: true},
    // imagePath3: { type: DataTypes.STRING, allowNull: true},
    // imagePath4: { type: DataTypes.STRING, allowNull: true},
    color: { type: DataTypes.STRING, allowNull: true, defaultValue: "#0000ff"},
    price: { type: DataTypes.FLOAT(11, 2), allowNull: false },
    discount: { type: DataTypes.FLOAT(3, 0), defaultValue: 0},
    description: { type: DataTypes.STRING(512), allowNull: true }
  }, {timestamps:false});

  Product.associate = function(models) {
    // associations can be defined here
    Product.hasOne(models.Design_model);
    // Product.belongsTo(models.Product_type);
  };

  return Product;
};
