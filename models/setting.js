'use strict';
module.exports = (sequelize, DataTypes) => {
  var Setting = sequelize.define('Setting', {
    key: { type: DataTypes.STRING, allowNull: false },
	value: { type: DataTypes.FLOAT(2, 1), allowNull: false }
  }, {});
  Setting.associate = function(models) {
    // associations can be defined here
  };
  return Setting;
};
