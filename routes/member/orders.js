var express = require('express');
var router = express.Router();
var models = require('../../models');

var ordersController = require('../../controllers/ordersController');
var settingsController = require('../../controllers/settingsController');

router.get('/', (req, res) => {
	if (!req.isAuthenticated() || req.user.role != 'user' || req.user.isActive == 0){
		res.redirect('/');
		return;
	}
	var message = req.session.message;
	req.session.message = null;
	var statuses = ['pending', 'processing', 'delivered'];
	ordersController.getAllByUserId(req.user.id, statuses, function(orders){
		res.render('member/orders/orders.hbs', {
			orders: orders,
			message: message,
			layout: 'admin-layout',
			isMember: true,
			addNewPage: '/admin/orders/create',
			adminContentHeader: 'All Orders',
			breadcrumbs: [
				{title: "All Oders", link: "/admin/orders"}
			]
		})
	});

});

router.get('/:id/detail', (req, res) => {
	if (!req.isAuthenticated() || req.user.role != 'user' || req.user.isActive == 0){
		res.redirect('/');
		return;
	}
	var id = req.params.id;
	ordersController.getById(id, function(order){
		var temp = (order.subtotal) * order.productQty;
		order.totalPrice = temp + temp * order.tax / 100;
		res.render('member/orders/detail-order.hbs', {
			order: order,
			layout: 'admin-layout',
			isMember: true,
			adminContentHeader: 'Edit Order',
			breadcrumbs: [
				{title: "Orders", link: "/member/orders"},
				{title: "Edit Order", link: "#"}
			]
		});
	});
});

router.get('/:id/invoice', (req, res) => {
	if (!req.isAuthenticated() || req.user.role != 'user' || req.user.isActive == 0){
		res.redirect('/');
		return;
	}
	var orderId = req.params.id;
	ordersController.getById(orderId, function(order){
		ordersController.getAllByCode(order.orderCode, function(orders){
			settingsController.getAll(function(settings){
				var user = [];
				var admin = {
					companyName: settings.companyName,
					companyAddress: settings.companyAddress,
					companyCity: settings.companyCity,
					companyCountry: settings.companyCountry,
					companyPhone: settings.companyPhone,
					companyEmail: settings.companyEmail
				};
				var price = [];
				price.subtotal = 0;
				price.tax = settings.tax;

				for (var i in orders){
					price.subtotal += orders[i].subtotal;
					price.shipping = orders[i].shipping;
					user = orders[i].user;
				}
				price.taxAmount = price.subtotal * (price.tax) / 100;
				price.totalPrice = price.subtotal + price.taxAmount + price.shipping;

				res.render('member/orders/invoice.hbs', {
					orders: orders,
					orderCode: order.orderCode,
					user: user,
					admin: admin,
					orderId: orderId,
					price: price,
					settings: settings,
					layout: 'admin-layout',
					isMember: true,
					adminContentHeader: 'Order Invoice',
					breadcrumbs: [
						{title: "Orders", link: "/member/orders"},
						{title: "Order Invoice", link: "#"}
					]
				})
			})
		});
	});
});

router.post('/:id/cancel', (req, res) => {
	var id = req.params.id;
	var object = {
		status: 'canceled'
	};
	ordersController.update(id, object, function(object){
		res.send({message:"success"});
	});
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
