var express = require('express');
var router = express.Router();
var models = require('../models');

var ordersController = require('../controllers/ordersController');

router.put('/:id', function(req, res){
    id = req.params.id;

    ordersController.update(id, req.body, function(comment){
        res.send({status:"success"});
    });
})

router.delete('/:id', function(req, res){
	// res.render('details', ...)
    id = req.params.id;
    ordersController.delete(id, function(products){
        res.send({status:"success"});
    });
})

module.exports = router;
