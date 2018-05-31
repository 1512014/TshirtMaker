'use strict';
module.exports = (sequelize, DataTypes) => {
  var Extra = sequelize.define('Extra', {
    name: { type: DataTypes.STRING, allowNull: false},
    price: { type: DataTypes.FLOAT(11, 2), allowNull: false }
  }, {});
  Extra.associate = function(models) {
    // associations can be defined here
    Extra.hasMany(models.Product_extra);
  };
  return Extra;
};
