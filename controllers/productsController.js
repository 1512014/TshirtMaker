var controller = {};

var models = require('../models');

controller.getAll = function(callback){
    models.Product
    .findAll({
        limit: 10,
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
