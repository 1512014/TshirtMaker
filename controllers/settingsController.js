var controller = {};

var models = require('../models');

controller.getSetting = function(settingKey, callback){
    models.Setting
    .findOne({
		where: {
			key: settingKey
		}
	})
    .then(function(object){
        callback(object);
    })
};

controller.getAll = function(callback){
	models.Setting
    .findAll({})
    .then(function(objects){
		setting = [];
		for (var i = 0; i < objects.length; i++){
			key = objects[i].key
			setting[key] = objects[i].value;
		}
        callback(setting);
    })
}

module.exports = controller;
