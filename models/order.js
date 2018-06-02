'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    product_qty: { type: DataTypes.INTEGER, allowNull: false},
    product_size: { type: DataTypes.INTEGER, allowNull: false},
    status: { type: DataTypes.INTEGER, allowNull: false },
    subtotal: { type: DataTypes.FLOAT(11, 2), allowNull: false },
    tax: { type: DataTypes.FLOAT(2, 1), allowNull: false },
    shipping: { type: DataTypes.FLOAT(11, 2), defaultValue: 0},
    extras_id: { type: DataTypes.STRING, allowNull: true}
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.User);
  };
  return Order;
};
