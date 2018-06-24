var express = require('express');
var router = express.Router();
var models = require('../../models');

var ordersController = require('../../controllers/ordersController');

router.get('/', (req, res) => {
	res.render('member/orders/orders.hbs', {
		layout: 'admin-layout',
		isMember: true,
		addNewPage: '/admin/orders/create',
		adminContentHeader: 'All Orders',
		breadcrumbs: [
			{title: "All Oders", link: "/admin/orders"}
		]
	})
});

router.get('/:id/edit', (req, res) => {
	res.render('member/orders/edit-order.hbs', {
		layout: 'admin-layout',
		isMember: true,
		adminContentHeader: 'Edit Order',
		breadcrumbs: [
			{title: "Orders", link: "/member/orders"},
			{title: "Edit Order", link: "#"}
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
