'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false, unique: true },
    remember_token: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.INTEGER, allowNull: false },
    gender: { type: DataTypes.INTEGER, allowNull: false },
    phone_number: { type: DataTypes.BIGINT(50), allowNull: false },
    country: { type: DataTypes.STRING(50), allowNull: false },
    city: { type: DataTypes.STRING(50), allowNull: false },
    address: { type: DataTypes.STRING(512), allowNull: false }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
