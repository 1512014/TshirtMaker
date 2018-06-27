var controller = {};

var models = require('../models');

var ordersController = require('../controllers/ordersController');
var settingsController = require('../controllers/settingsController');
var productTypesController = require('../controllers/productTypesController');

controller.getAll = function(callback){
    models.Design_model
    .then(function(designs){
        callback(designs);
    })
};

controller.getById = function(id, callback){
    models.Design_model
    .findOne({
        where: {id: id},
    })
    .then(function(object){
        callback(object);
    });
};


controller.create = function (object, callback){
    models.Design_model
    .create(object)
    .then(function(message){
        callback(message);
    })
}


controller.update = function (id, object, callback){
	// console.log("Hiiii: " + object.name);
    models.Design_model
    .update(
		object,
		{ where: {id: id} }
	)
    .then(function(message){
        callback(message);
    })
}

controller.delete = function (id, callback) {
	models.Design_model
	.destroy({
		where: {id: id}
	})
	.then(function(message){
		callback(message);
	})
}

module.exports = controller;
