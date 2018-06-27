var controller = {};
var validator = require('validator');
var models = require('../models');

controller.getSetting = function(settingKey, callback){
    models.Setting
    .findOne({
		where: {
			key: settingKey
		}
	})
    .then(function(object){
		if (validator.isNumeric(object.value))
		{
			callback(parseFloat(object.value));
		} else {
			callback(object.value);
		}
    })
};

controller.getAll = function(callback){
	models.Setting
    .findAll({})
    .then(function(objects){
		settings = [];
		for (var i = 0; i < objects.length; i++){
			key = objects[i].key
			if (validator.isNumeric(objects[i].value))
			{
				settings[key] = parseFloat(objects[i].value);
			} else {
				settings[key] = objects[i].value;
			}

		}
        callback(settings);
    })
}

controller.update = function(key, value, callback){
	models.Setting
	.update(
		{ value: value },
		{
			where: {key: key}
		}
	)
	.then(function(object){
		callback(object);
	})
}

module.exports = controller;
