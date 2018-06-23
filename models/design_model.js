'use strict';
module.exports = (sequelize, DataTypes) => {
  var Design_model = sequelize.define('Design_model', {
    imageFront: { type: DataTypes.STRING, allowNull: true},
	imageBack: { type: DataTypes.STRING, allowNull: true},
    size: { type: DataTypes.STRING(11), defaultValue: 0}
  }, {});
  Design_model.associate = function(models) {
    // associations can be defined here
    // Design_model.belongsTo(models.Product)
  };
  return Design_model;
};
