var express = require('express');
var router = express.Router();
var models = require('../models');

var ordersController = require('../controllers/ordersController');
var productsController = require('../controllers/productsController');
var settingsController = require('../controllers/settingsController');

router.get('/', function (req, res) {
	page = parseInt(req.query.page);
	status = req.query.orderStatus;
	userId = 1; //TODO: change later
	if (!status) status = 'pending'; //Pending status
	limit = 100;
	products = [];
	totalPrice = { subtotal: 0, total: 0 };
	// orders = [];
	// products = [];
	// totalPrice = {subtotal: 0, total: 0};
	statuses = ['pending'];

	settingsController.getAll(function (settings) {
		ordersController.getAllByUserId(userId, statuses, function (objects) {
			numRows = objects.length;
			if (!page) {
				page = 1;
			}
			orders = objects.slice((page - 1) * limit, page * limit);
			var totalPrice = {
				subtotal: 0,
				total: 0
			};
			for (var i in orders) {
				totalPrice.subtotal += orders[i].subtotal * orders[i].productQty;
			}
			totalPrice.total = totalPrice.subtotal + totalPrice.subtotal * settings.tax / 100;
			var is_member = false;
			if (req.isAuthenticated()) is_member = true;
			var name = "";
			if (req.user) name = req.user.lastName;
			res.render('view-cart.hbs', {
				userId: userId,
				isMember: is_member,
				name: name,
				orders: orders,
				settings: settings,
				totalPrice: totalPrice,
				nOrders: orders.length,
				pageHeader: true,
				cssViewCart: true,
				breadcrumbs: [
					{ title: "View Cart", link: "/view-cart" }
				],
				pagination: { page: page, limit: limit, totalRows: numRows }
			});
		});

	});
});

module.exports = router;
