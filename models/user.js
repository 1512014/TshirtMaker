'use strict';
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('Users', {
    firstName: { type: DataTypes.STRING, allowNull: false },
  	lastName: { type: DataTypes.STRING, allowNull: false },
  	email: { type: DataTypes.STRING, allowNull: false, unique: true },
  	password: { type: DataTypes.STRING, allowNull: false },
  	rememberToken: { type: DataTypes.STRING, allowNull: true },
  	role: { type: DataTypes.INTEGER, allowNull: false },
  	gender: { type: DataTypes.INTEGER, allowNull: false },
  	phoneNumber: { type: DataTypes.STRING, allowNull: false },
  	country: { type: DataTypes.STRING(50), allowNull: false },
  	city: { type: DataTypes.STRING(50), allowNull: false },
  	address: { type: DataTypes.STRING(512), allowNull: false },
  	isActive: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  }, {
  freezeTableName: true,
  instanceMethods: {
	  generateHash: function (password) {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
      },
      validPassword: function (password) {
          return bcrypt.compareSync(password, this.password)
	  }
 	}
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
