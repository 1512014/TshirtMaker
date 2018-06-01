'use strict';
module.exports = (sequelize, DataTypes) => {
  var Design_model = sequelize.define('Design_model', {
    texts: { type: DataTypes.STRING, allowNull: true},
    imagesPath: { type: DataTypes.STRING, allowNull: true},
    color: { type: DataTypes.STRING(11), defaultValue: 0},
    size: { type: DataTypes.STRING(11), defaultValue: 0}
  }, {});
  Design_model.associate = function(models) {
    // associations can be defined here
    // Design_model.belongsTo(models.Product)
  };
  return Design_model;
};
