var express = require('express');
var router = express.Router();
var models = require('../../models');

var ordersController = require('../../controllers/ordersController');

router.get('/', (req, res) => {
	res.render('admin/products/list-products.hbs', {
		layout: 'admin-layout',
		addNewPage: '/admin/products/create',
		adminContentHeader: 'All Products',
		breadcrumbs: [
			{title: "Products", link: "/admin/products/"}
		]
	})
});


router.get('/create', (req, res) => {
	res.render('admin/products/new-product.hbs', {
		layout: 'admin-layout',
		adminContentHeader: 'New Product',
		breadcrumbs: [
			{title: "Products", link: "/admin/products/"},
			{title: "New Product", link: "/admin/products/create"}
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
