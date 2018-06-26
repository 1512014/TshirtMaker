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
	var id = req.params.id;
	ordersController.getById(id, function(order){
		order.productSize = productsController.getSize(order.productSize);
		order.totalPrice = order.subtotal + order.shipping;
		res.render('admin/orders/detail-order.hbs', {
			order: order,
			layout: 'admin-layout',
			adminContentHeader: 'Order Detail',
			breadcrumbs: [
				{title: "Orders", link: "/admin/orders"},
				{title: "Order Detail", link: "#"}
			]
		})
	});

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

router.post('/:id/delete', (req, res) => {
	var id = req.params.id;
	object = {
		status: 'deleted'
	};
	ordersController.update(id, object, function(object){
		res.send({message:"success"});
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
