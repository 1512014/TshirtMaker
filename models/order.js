'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    orderCode: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    productQty: { type: DataTypes.INTEGER, allowNull: false},
    status: { type: DataTypes.STRING, allowNull: false },
	userId: { type: DataTypes.INTEGER, allowNull: false },
	designId: { type: DataTypes.INTEGER, allowNull: false },
    payment_method:{type: DataTypes.STRING, allowNull: true }
  }, {timestamps:false});
  Order.associate = function(models) {
    // associations can be defined here
    // Order.belongsTo(models.User);
  };
  return Order;
};
