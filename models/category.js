'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Product_type);
  };
  return Category;
};
