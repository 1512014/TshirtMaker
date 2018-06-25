'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    productId: { type: DataTypes.INTEGER, allowNull: false },
    productQty: { type: DataTypes.INTEGER, allowNull: false},
    productSize: { type: DataTypes.INTEGER, allowNull: false},
    status: { type: DataTypes.INTEGER, allowNull: false },
    subtotal: { type: DataTypes.FLOAT(11, 2), allowNull: false },
    shipping: { type: DataTypes.FLOAT(11, 2), defaultValue: 0}
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    // Order.belongsTo(models.User);
  };
  return Order;
};
