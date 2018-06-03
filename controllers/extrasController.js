var controller = {};

var models = require('../models');


controller.getAll = function(callback){
    models.Extra
    .findAll({
    })
    .then(function(objects){
        callback(objects);
    });
}


module.exports = controller;
