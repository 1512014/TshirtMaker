'use strict';
module.exports = (sequelize, DataTypes) => {
  var Extra = sequelize.define('Extra', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    price: { type: DataTypes.FLOAT(11, 2), allowNull: false }
  }, {});
  Extra.associate = function(models) {
    // associations can be defined here
  };
  return Extra;
};
