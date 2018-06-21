var controller = {};

var models = require('../models');

controller.getAllByUserId = function(userId, status, callback){
    models.Order
    .findAll({
        where: {
            UserId: userId,
            status: status
        },
        order: [
            ['id', 'DESC']
        ]
    })
    .then(function(objects){
        callback(objects);
    })
};

controller.getQtyAndSize = function(order, callback){
    callback({productQty: order.qty, productSize: order.size})
}

// controller.addNew = function(comment, articleId, callback){
//     models.Comment
//     .create({
//         comment: comment,
//         ArticleId: articleId
//     })
//     .then(function(comments){
//         callback(comments);
//     })
// };

controller.delete = function(id, callback){
    models.Order
    .destroy({
        where: {id:id}
    })
    .then(function(order){
        callback(order);
    })
};

controller.update = function(id, object, callback){
	console.log('OBJECT: ' + object);
    models.Order
    .update(
        object,
        { where: {id: id} }
    )
    .then(function(order){
        callback(order);
    })
};

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

module.exports = controller;
