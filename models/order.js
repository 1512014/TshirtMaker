'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    orderCode: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    productQty: { type: DataTypes.INTEGER, allowNull: false},
    status: { type: DataTypes.STRING, allowNull: false },
    subtotal: { type: DataTypes.FLOAT(11, 2), allowNull: false },
    shipping: { type: DataTypes.FLOAT(11, 2), defaultValue: 0},
	userId: { type: DataTypes.INTEGER, allowNull: false },
	designId: { type: DataTypes.INTEGER, allowNull: false }

  }, {timestamps:false});
  Order.associate = function(models) {
    // associations can be defined here
    // Order.belongsTo(models.User);
  };
  return Order;
};
