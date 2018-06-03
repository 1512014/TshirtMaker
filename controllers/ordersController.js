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

controller.getExtrasByIds = function(extraIds, callback){
    models.Extra
    .findAll({
        where: {id: extraIds}
    })
    .then(function(extras){
        result = [];
        result.totalPrice = 0;
        result.extras = extras;
        for (var i = 0; i < extras.length; i++){
            result.totalPrice += extras[i].price;
        }
        callback(result);
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
