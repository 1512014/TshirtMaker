var express = require('express');
var router = express.Router();
var models = require('../../models');

var ordersController = require('../../controllers/ordersController');
var productsController = require('../../controllers/productsController');

router.get('/', (req, res) => {
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

router.get('/create', (req, res) => {
	res.render('admin/orders/new-order.hbs', {
		layout: 'admin-layout',
		adminContentHeader: 'New Order',
		breadcrumbs: [
			{title: "Orders", link: "/admin/orders"},
			{title: "New Oder", link: "/admin/orders/create"}
		]
	})
});

router.get('/:id/invoice', (req, res) => {
	res.render('admin/orders/invoice.hbs', {
		layout: 'admin-layout',
		adminContentHeader: 'Invoice',
		breadcrumbs: [
			{title: "Orders", link: "/admin/orders"},
			{title: "Invoice", link: "#"}
		]
	})
});


//
// router.delete('/:id', function(req, res){
// 	// res.render('details', ...)
//     id = req.params.id;
//     ordersController.delete(id, function(products){
//         res.send({status:"success"});
//     });
// })

module.exports = router;
