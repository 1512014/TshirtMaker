var express = require('express');
var router = express.Router();
var models = require('../../models');

var ordersController = require('../../controllers/ordersController');

router.get('/', (req, res) => {
	res.render('admin/product_types/list-product-types.hbs', {
		layout: 'admin-layout',
		addNewPage: '/admin/product-types/create',
		adminContentHeader: 'All Product Types',
		breadcrumbs: [
			{title: "Product Types", link: "/admin/product-types"}
		]
	})
});

router.get('/create', (req, res) => {
	res.render('admin/product_types/new-product-type.hbs', {
		layout: 'admin-layout',
		adminContentHeader: 'New Product Type',
		breadcrumbs: [
			{title: "Product Types", link: "/admin/product-types"},
			{title: "New Product Type", link: "/admin/product-types/create"}
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
