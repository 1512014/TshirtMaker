var controller = {};

var models = require('../models');
var ordersController = require('../controllers/ordersController');

controller.getAll = function(callback){
    models.Product
    .findAll({
        order: [
            ['updatedAt', 'DESC']
        ]
    })
    .then(function(objects){
        callback(objects);
    })
};

controller.getById = function(id, callback){
    models.Product
    .findOne({
        where: {id: id},
        // include: [models.Product_type],
        order: [
            // [models.Comment, 'updatedAt', 'DESC']
        ]
    })
    .then(function(object){
        //Calculate discount price
        object.discountPrice = object.price * (100 - object.discount) / 100;
        object.discountAmount = object.price * object.discount / 100;

        //Change size from number to latin (EX: 1 -> XS, 2 -> S, 3 -> M, ...)
        object.minSizeLatin = controller.getSize(object.minSize);
        object.maxSizeLatin = controller.getSize(object.maxSize);

        //Get all types of a product & breadcrumbs
        typeIds = JSON.parse(object.types_id);
        object.breadcrumbs = [];
        controller.getProductTypes(typeIds, function(types){
            object.types = types;
            object.listTypes = types.map(function(elem){
                object.breadcrumbs.push({title: elem.name, link: "#"});
                return elem.name;
            }).join(", ");
        });

        callback(object);
    });
};

controller.getProductFromOrder = function(order, propductId, qty, size, extraIds, callback){
    product = [];
    productExtra = [];
    ordersController.getExtras(extraIds, function(result){
        productExtra = result;
        controller.getById(propductId, function(object){
            order.totalPrice = order.subtotal + order.shipping + productExtra.totalPrice;
            product = {order: order, product: object, product_qty: qty, product_size: size, product_extra: productExtra};
            callback(product);
        });
    });
    // setTimeout(()=>{

    // }, 500);

};

controller.getProductTypes = function (typeIds, callback) {
    models.Product_type
    .findAll({
        where: { id: typeIds }
    })
    .then(function(objects){
        callback(objects);
    })
}

controller.getRelatedProduct = function(callback){
    models.Product
    .findAll({
        limit: 4,
        order: [
            ['updatedAt', 'DESC']
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
