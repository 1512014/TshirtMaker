

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

controller.create = function (object, callback){
	models.User
    .create(
		object
	)
	.then(function(user){
        callback(user);
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
controller.getRole = function(id,callback){
    models.User
    .findOne({
		where: {id: id}
	}).then(function(object){
        console.log(object);
        temp=JSON.stringify(object.dataValues);
        temp1=JSON.parse(temp);
        callback(null,temp1.role);
    });
}
module.exports = controller;
