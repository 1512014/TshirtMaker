'use strict';
module.exports = (sequelize, DataTypes) => {
  var Design_model = sequelize.define('Design_model', {
    title: DataTypes.STRING
  }, {});
  Design_model.associate = function(models) {
    // associations can be defined here
  };
  return Design_model;
};
