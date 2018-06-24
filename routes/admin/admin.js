var express = require('express');
var router = express.Router();
var models = require('../../models');
// const bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());
var ordersController = require('../../controllers/ordersController');

router.get('/', (req, res) => {
	res.render('admin/dashboard.hbs', {
		layout: 'admin-layout',
		adminContentHeader: 'Dashboard',
		breadcrumbs: [
			{title: "Dashboard", link: "/admin"}
		]
	})
});

var users = require('./users');
router.use('/users', users);
var productTypes = require('./product-types');
router.use('/product-types', productTypes);
var orders = require('./orders');
router.use('/orders', orders);
var products = require('./products');
router.use('/products', products);
var setting = require('./setting');
router.use('/setting', setting);

// router.put('/:id', function(req, res){
//     id = req.params.id;
//
//     ordersController.update(id, req.body, function(comment){
//         res.send({status:"success"});
//     });
// })
//
// router.delete('/:id', function(req, res){
// 	// res.render('details', ...)
//     id = req.params.id;
//     ordersController.delete(id, function(products){
//         res.send({status:"success"});
//     });
// })

module.exports = router;
