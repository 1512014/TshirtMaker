var controller = {};

var models = require('../models');
var ordersController = require('../controllers/ordersController');
var settingsController = require('../controllers/settingsController');

controller.getAll = function(callback){
    models.Product
    .findAll({
        order: [
            ['id', 'DESC']
        ]
    })
    .then(function(objects){
        callback(objects);
    })
};

controller.getById = function(id, callback){
	console.log(id);
    models.Product
    .findOne({
        where: {id: id},
        // include: [models.Product_type],
        order: [
            ['id', 'DESC']
        ]
    })
    .then(function(object){
        //Calculate discount price
        object.discountPrice = object.price * (100 - object.discount) / 100;
        object.discountAmount = object.price * object.discount / 100;

        //Change size from number to latin (EX: 1 -> XS, 2 -> S, 3 -> M, ...)
        object.minSizeLatin = controller.getSize(object.minSize);
        object.maxSizeLatin = controller.getSize(object.maxSize);
        object.breadcrumbs = [];
        //Get all types of a product & breadcrumbs
        typeId = object.typeId;
        controller.getProductType(typeId, function(type){
            object.type = type;
            object.breadcrumbs.push({title: object.type.name, link: "#"});
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

		//getTax
		var taxKey = 'tax';
		settingsController.getSetting(taxKey, function (setting) {
			var tax = setting.value;
			tempSubtotal = order.subtotal * order.productQty +  order.shipping;
			//Get totalPrice
	        product.totalPrice = tempSubtotal
			totalPrice.subtotal += tempSubtotal;
	        totalPrice.total += tempSubtotal + tempSubtotal*tax/100;
			totalPrice.tax = tax;

	        productData.product = product;
	        products.push(productData);
	        callback({products: products, totalPrice: totalPrice});
		})
    });

};

controller.getProductType = function (typeId, callback) {
    models.Product_type
    .findOne({
        where: { id: typeId }
    })
    .then(function(object){
        callback(object);
    })
}

controller.getRelatedProduct = function(callback){
    models.Product
    .findAll({
        limit: 4,
        order: [
            ['id', 'DESC']
        ]
    })
    .then(function(objects){
        callback(objects);
    })
};

controller.getSize = (sizeNumber) => {
    switch (sizeNumber) {
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
        default:
    }
};

controller.getProductByProductIds = function (productIds, callback){
    models.Product_type
    .findAll({
        where: { id: productIds }
    })
    .then(function(objects){
        callback(objects);
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
