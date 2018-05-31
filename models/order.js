'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    products_id: { type: DataTypes.STRING, allowNull: false },
    products_qty: { type: DataTypes.STRING, allowNull: false},
    status: { type: DataTypes.INTEGER, allowNull: false },
    subtotal: { type: DataTypes.FLOAT(11, 2), allowNull: false },
    tax: { type: DataTypes.FLOAT(2, 1), allowNull: false },
    shipping: { type: DataTypes.FLOAT(11, 2), defaultValue: 0}
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.User);
  };
  return Order;
};
