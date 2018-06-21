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

module.exports = controller;
