var express = require('express');
var router = express.Router();
var models = require('../../models');

var settingsController = require('../../controllers/settingsController');

router.get('/', (req, res) => {
	if (!req.isAuthenticated() || req.user.role != 'admin'){
		res.redirect('/');
		return;
	}
	var message = req.session.message;
  	req.session.message = null;
	settingsController.getAll(function(setting){
		res.render('admin/setting/setting.hbs', {
			message: message,
			settings: setting,
			layout: 'admin-layout',
			adminContentHeader: 'Setting',
			breadcrumbs: [
				{title: "Setting", link: "#"}
			]
		});
	});

});

router.get('/edit', (req, res) => {
	if (!req.isAuthenticated() || req.user.role != 'admin'){
		res.redirect('/');
		return;
	}
	var message = req.session.message;
  	req.session.message = null;
	settingsController.getAll(function(setting){
		res.render('admin/setting/edit-setting.hbs', {
			settings: setting,
			message: message,
			layout: 'admin-layout',
			adminContentHeader: 'Edit Setting',
			breadcrumbs: [
				{title: "Setting", link: "/admin/setting"},
				{title: "Edit Setting", link: "#"}
			]
		});
	});

});

router.post('/edit', (req, res) => {
	var objects = req.body;
	settingsController.update('tax', objects.tax, function(object){
		settingsController.update('frontDesignPrice', objects.frontDesignPrice, function(object){
			settingsController.update('backDesignPrice', objects.backDesignPrice, function(object){
				req.session.message = "Edit Successfully!";
				res.redirect('/admin/settings');
			});
		});
	});
})
//
// router.delete('/:id', function(req, res){
// 	// res.render('details', ...)
//     id = req.params.id;
//     ordersController.delete(id, function(products){
//         res.send({status:"success"});
//     });
// })

module.exports = router;
