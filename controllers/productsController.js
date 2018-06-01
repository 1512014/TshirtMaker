var controller = {};

var models = require('../models');

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
        callback(object);
    });
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
