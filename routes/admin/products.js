var express = require('express');
var router = express.Router();
var models = require('../../models');

var productsController = require('../../controllers/productsController');
var productTypesController = require('../../controllers/productTypesController');

router.get('/', (req, res) => {
	productsController.getAll(function(products){
		res.render('admin/products/list-products.hbs', {
			products: products,
			layout: 'admin-layout',
			addNewPage: '/admin/products/create',
			adminContentHeader: 'All Products',
			breadcrumbs: [
				{title: "Products", link: "/admin/products/"}
			]
		})
	});
});

// router.get('/:id', (req, res) => {
//
// });

router.get('/create', (req, res) => {

	productTypesController.getAllProductTypes(function(types){
		res.render('admin/products/new-product.hbs', {
			productTypes: types,
			layout: 'admin-layout',
			adminContentHeader: 'New Product',
			breadcrumbs: [
				{title: "Products", link: "/admin/products/"},
				{title: "New Product", link: "/admin/products/create"}
			]
		})
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
