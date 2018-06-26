var controller = {};

var models = require('../models');

controller.getAll = function (callback) {
    models.User
    .findAll({})
    .then(function(objects){
        callback(objects);
    })
}

controller.getById = function (id, callback){
    models.User
    .findOne({
		where: {id: id}
	})
    .then(function(object){
        callback(object);
    })
}

controller.update = function (id, object, callback){
    models.User
    .update(
		object,
		{ where: { id: id } }
	)
	.then(function(object){
        callback(object);
    })
}
module.exports = controller;
