var express = require('express');
var router = express.Router();
var models = require('../models');

var ordersController = require('../controllers/ordersController');
var usersController = require('../controllers/usersController');

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
	var designId = req.body.designId;
	req.body.designId = null;
	var userId = req.user ? req.user.id : req.session.guestId;
	if (!userId){
		userData = {
			firstName: 'Guest',
			lastName: 'Guest',
			email: Math.random().toString(36).substring(7) + '@gmail.com',
			password: 'guest',
			role: 'guest',
			gender: 'male',
			isActive: 0
		};
		usersController.create(userData, function(user){
			req.session.guestId = user.id;
			userId = user.id;
			var orderData = {
				productId: productId,
				productQty: 1,
				status: 'pending',
				shipping: 0,
				designId: designId,
				userId: userId //change to current user id
			};
			ordersController.create(orderData, function(order){
				res.redirect('/products/' + productId + '/finished');
			});
		})
	} else {
		var orderData = {
			productId: productId,
			productQty: 1,
			status: 'pending',
			shipping: 0,
			designId: designId,
			userId: userId //change to current user id
		};
		ordersController.create(orderData, function(order){
			res.redirect('/products/' + productId + '/finished');
		});
	}
});

module.exports = router;
