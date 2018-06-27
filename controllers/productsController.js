var controller = {};
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

var models = require('../models');
var ordersController = require('../controllers/ordersController');
var settingsController = require('../controllers/settingsController');
var productTypesController = require('../controllers/productTypesController');

controller.getAll = function(callback){
    models.Product
    .findAll({
        order: [
            ['id', 'DESC']
        ]
    })
    .then(function(products){
		products.forEach(function(product){
			productTypesController.getProductType(product.typeId, function(type){
				product.typeName = type.name;
				product.gender = type.gender;
			});

		});
        setTimeout(callback, 1000, products);
    })
};

controller.getFilterOptions = function(callback){
	var filters = [];
	models.Product_type
    .findAll({})
    .then(function(productTypes){
		filters.productTypes = productTypes;
    })
	filters.sizes = [];
	for (var i = 0; i <= 7; i++){
		filters.sizes.push(controller.getSize(i));
	}
	setTimeout(callback, 1000, filters);
}

controller.getById = function(id, callback){
    models.Product
    .findOne({
        where: {id: id},
    })
    .then(function(object){
        //Calculate discount price
        object.discountPrice = object.price * (100 - object.discount) / 100;
        object.discountAmount = object.price * object.discount / 100;

        //Change size from number to latin (EX: 1 -> XS, 2 -> S, 3 -> M, ...)
        object.minSizeLatin = controller.getSize(object.minSize);
        object.maxSizeLatin = controller.getSize(object.maxSize);
		object.sizes = [];
		for (var i = object.minSize; i <= object.maxSize; i++){
			object.sizes.push({
				sizeNumber: i,
				sizeLatin: controller.getSize(i)
			});
		}
        //Get all types of a product & breadcrumbs
        typeId = object.typeId;
        productTypesController.getProductType(typeId, function(type){
            object.type = type;
            object.breadcrumbs = [
				{title: object.type.name, link: "#"},
				{title: object.name, link: "#"}
			];
            callback(object);
        });


    });
};

controller.getProductFromOrder = function(order, products, totalPrice, callback){

    productId = order.productId;
    var productData = {
          order: order,
          product: [],
          productQty: order.productQty,
          productSize: controller.getSize(order.productSize)
    };

    controller.getById(productId, function(product){
		tempSubtotal = order.subtotal * order.productQty +  order.shipping;
		//Get totalPrice
        product.totalPrice = tempSubtotal;
		totalPrice.subtotal += tempSubtotal;
        totalPrice.total += tempSubtotal;
        productData.product = product;

        products.push(productData);
        callback({products: products, totalPrice: totalPrice});
    });

};

controller.getRelatedProduct = function(id, callback){
    models.Product
    .findAll({
		where: {
			id: {[Op.not]: id}
		},
        limit: 4,
        order: [
            ['id', 'DESC']
        ]
    })
    .then(function(objects){
		for (var i = 0; i < objects.length; i++){
			objects[i].minSizeLatin = controller.getSize(objects[i].minSize);
	        objects[i].maxSizeLatin = controller.getSize(objects[i].maxSize);
		}
        callback(objects);
    })
};

controller.getSize = (sizeNumber) => {
    switch (sizeNumber) {
		case 0:
			return "XXS";
			break;
        case 1:
            return "XS";
            break;
        case 2:
            return "S";
            break;
        case 3:
            return "M";
            break;
        case 4:
            return "L";
            break;
        case 5:
            return "XL";
            break;
        case 6:
            return "XXL";
            break;
		case 7:
			return "3XL";
			break;
        default:
    }
};

controller.createProduct = function (object, callback){
    models.Product
    .create(object)
    .then(function(message){
        callback(message);
    })
}


controller.updateProduct = function (id, object, callback){
	// console.log("Hiiii: " + object.name);
    models.Product
    .update(
		object,
		{ where: {id: id} }
	)
    .then(function(message){
        callback(message);
    })
}

controller.deleteProduct = function (id, callback) {
	models.Product
	.destroy({
		where: {id: id}
	})
	.then(function(message){
		callback(message);
	})
}


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
