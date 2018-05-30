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

// controller.getById = function(id, callback){
//     models.Article
//     .findOne({
//         where: {id: id},
//         include: [models.Comment],
//         order: [
//             [models.Comment, 'updatedAt', 'DESC']
//         ]
//     })
//     .then(function(article){
//         callback(article);
//     });
// };
//
// controller.getByName = function(q, callback){
//     models.Article
//     .findAll({
//         where: {title: q},
//         include: [models.Comment]
//     })
//     .then(function(articles){
//         callback(articles);
//     });
// }
module.exports = controller;
