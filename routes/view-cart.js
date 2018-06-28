var express = require('express');
var router = express.Router();
var models = require('../models');

var ordersController = require('../controllers/ordersController');
var productsController = require('../controllers/productsController');
var settingsController = require('../controllers/settingsController');

router.get('/', function(req, res){
    var page = parseInt(req.query.page);
    var status = req.query.orderStatus;
    var user = req.user;
	var userId = req.user ? req.user.id : req.session.guestId;
    if (!status) status = 'pending'; //Pending status
    limit = 100;
    products = [];
    totalPrice = {subtotal: 0, total: 0};
    // orders = [];
    // products = [];
    // totalPrice = {subtotal: 0, total: 0};
	statuses = ['pending'];

	settingsController.getAll(function(settings){
	    ordersController.getAllByUserId(userId, statuses, function(objects){
	      numRows = objects.length;
	      if(!page){
	          page = 1;
	      }
	      orders = objects.slice((page-1)*limit, page*limit);
		  var totalPrice = {
			  subtotal: 0,
			  total: 0
		  };
	      for (var i in orders){
			  totalPrice.subtotal += orders[i].subtotal * orders[i].productQty;
	      }
		  totalPrice.total = totalPrice.subtotal + totalPrice.subtotal * settings.tax/100;

		  res.render('view-cart.hbs', {
			userId : userId,
			orders: orders,
			settings: settings,
			totalPrice: totalPrice,
			nOrders: orders.length,
			pageHeader: true,
			cssViewCart: true,
			breadcrumbs: [
				{title: "View Cart", link: "/view-cart"}
			],
			pagination: { page: page, limit: limit ,totalRows: numRows }
		  });
  	});

  });
});

module.exports = router;
