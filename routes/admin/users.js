var express = require('express');
var router = express.Router();
var models = require('../../models');

var ordersController = require('../../controllers/ordersController');

router.get('/', (req, res) => {
	res.render('admin/users/list-users.hbs', {
		layout: 'admin-layout',
		addNewPage: '/admin/users/create',
		adminContentHeader: 'All Users',
		breadcrumbs: [
			{title: "All Users", link: "/admin/users"}
		]
	})
});

router.get('/create', (req, res) => {
	res.render('admin/users/new-user.hbs', {
		layout: 'admin-layout',
		adminContentHeader: 'New User',
		breadcrumbs: [
			{title: "Users", link: "/admin/users"},
			{title: "New User", link: "#"}
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
