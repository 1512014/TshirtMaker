var express = require('express');
var router = express.Router();
var models = require('../../models');

var ordersController = require('../../controllers/ordersController');

router.get('/', (req, res) => {
	res.render('member/dashboard.hbs', {
		layout: 'admin-layout',
		isMember: true,
		adminContentHeader: 'Dashboard',
		breadcrumbs: [
			{title: "Dashboard", link: "#"}
		]
	})
});

router.get('/change-password', (req, res) => {
    res.render('member/change-password.hbs', {
		layout: 'admin-layout',
		isMember: true,
		adminContentHeader: 'Change Password',
	    breadcrumbs: [
	        {title: "Change Password", link: "#"}
	    ]
	});
});

var profile = require('./profile');
router.use('/profile', profile);
var orders = require('./orders');
router.use('/orders', orders);
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
