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

router.post('/:productId/add-to-cart', function(req, res){
	var productId = req.params.productId;
	//add design here
	orderData = {
		productId: productId,
		productQty: 1,
		status: 'pending',
		shipping: 0,
		designId: 1, //add design here
		userId: 1 //change to current user id

	};
	ordersController.create(orderData, function(order){
		res.redirect('/products/' + productId + '/finished');
	});
});

module.exports = router;
