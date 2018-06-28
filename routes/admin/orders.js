var express = require('express');
var router = express.Router();
var models = require('../../models');

var ordersController = require('../../controllers/ordersController');
var productsController = require('../../controllers/productsController');
var settingsController = require('../../controllers/settingsController');
var designsController = require('../../controllers/designsController');

router.get('/', (req, res) => {
	if (!req.isAuthenticated() || req.user.role != 'admin'){
		res.redirect('/');
		return;
	}
	var message = req.session.message;
  	req.session.message = null;
	ordersController.getAll(function(orders){
		res.render('admin/orders/list-orders.hbs', {
			message: message,
			orders: orders,
			layout: 'admin-layout',
			addNewPage: '/admin/orders/create',
			adminContentHeader: 'All Orders',
			breadcrumbs: [
				{title: "All Oders", link: "/admin/orders"}
			]
		})
	})

});

router.post('/:id/changeStatus', (req, res) => {
	var id = req.params.id;
	var newStatus = req.body.status;
	object = {
		status: newStatus
	};
	// console.log("new status: " + newStatus);
	ordersController.update(id, object, function(object){
		res.send({message:"success"});
	})
});

router.get('/:id', (req, res) => {
	if (!req.isAuthenticated() || req.user.role != 'admin'){
		res.redirect('/');
		return;
	}
	var id = req.params.id;
	ordersController.getById(id, function(order){
		var temp = (order.subtotal) * order.productQty;
		order.totalPrice = temp + temp * order.tax / 100;
		res.render('admin/orders/detail-order.hbs', {
			order: order,
			layout: 'admin-layout',
			adminContentHeader: 'Order Detail',
			breadcrumbs: [
				{title: "Orders", link: "/admin/orders"},
				{title: "Order Detail", link: "#"}
			]
		});
	});
});

router.post('/:id/delete', (req, res) => {
	var id = req.params.id;
	var object = {
		status: 'deleted'
	};
	ordersController.update(id, object, function(object){
		res.send({message:"success"});
	});
});
module.exports = router;
