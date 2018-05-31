'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false},
    //model_id
    //type_id
    qty: { type: DataTypes.BIGINT(11), allowNull: false, defaultValue: 1 },
    minSize: { type: DataTypes.INTEGER},
    maxSize: { type: DataTypes.INTEGER},
    imagePath1: { type: DataTypes.STRING, allowNull: false},
    imagePath2: { type: DataTypes.STRING, allowNull: true},
    imagePath3: { type: DataTypes.STRING, allowNull: true},
    imagePath4: { type: DataTypes.STRING, allowNull: true},
    price: { type: DataTypes.FLOAT(11, 2), allowNull: false },
    discount: { type: DataTypes.FLOAT(3, 0), defaultValue: 0},
    description: { type: DataTypes.STRING(512), allowNull: false },
    review: { type: DataTypes.FLOAT(3, 1)}
  }, {});

  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Product_type);
    Product.hasOne(models.Design_model);
    Product.hasMany(models.Product_extra);
  };

  return Product;
};
