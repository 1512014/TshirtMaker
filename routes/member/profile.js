var express = require('express');
var router = express.Router();
var models = require('../../models');

var ordersController = require('../../controllers/ordersController');

router.get('/', (req, res) => {
	res.render('member/profile/profile.hbs', {
		layout: 'admin-layout',
		isMember: true,
		addNewPage: '/admin/orders/create',
		adminContentHeader: 'Profile',
		breadcrumbs: [
			{title: "All Oders", link: "#"}
		]
	})
});

router.get('/edit', (req, res) => {
	res.render('member/profile/edit-profile.hbs', {
		layout: 'admin-layout',
		isMember: true,
		adminContentHeader: 'Edit Profile',
		breadcrumbs: [
			{title: "Profile", link: "/member/profile"},
			{title: "Edit Profile", link: "#"}
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
