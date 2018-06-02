'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order_status = sequelize.define('Order_status', {
    name: DataTypes.STRING
  }, {});
  Order_status.associate = function(models) {
    // associations can be defined here
  };
  return Order_status;
};