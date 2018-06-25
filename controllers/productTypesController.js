var controller = {};

var models = require('../models');

controller.getProductType = function (typeId, callback) {
    models.Product_type
    .findOne({
        where: { id: typeId }
    })
    .then(function(object){
        callback(object);
    })
}

controller.getAllProductTypes = function (callback){
    models.Product_type
    .findAll({})
    .then(function(objects){
        callback(objects);
    })
}

controller.getProductTypesByGender = function (gender, callback){
    models.Product_type
    .findAll({
        where: { gender: gender }
    })
	.then(function(objects){
        callback(objects);
    })
}

controller.createProductType = function (object, callback){
    models.Product_type
    .create(object)
    .then(function(message){
        callback(message);
    })
}

controller.updateProductType = function (id, object, callback){
	// console.log("Hiiii: " + object.name);
    models.Product_type
    .update(
		object,
		{ where: {id: id} }
	)
    .then(function(message){
        callback(message);
    })
}

controller.deleteProductType = function (id, callback) {
	models.Product_type
	.destroy({
		where: {id: id}
	})
	.then(function(message){
		callback(message);
	})
}

// Update model


// controller.update = function(id, comment, callback){
//     models.Comment
//     .update(
//         {
//             comment: comment
//         },
//         { where: {id: id} }
//     )
//     .then(function(comment){
//         callback(comment);
//     })
// };
//
module.exports = controller;
