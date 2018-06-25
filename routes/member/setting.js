var express = require('express');
var router = express.Router();
var models = require('../../models');

var ordersController = require('../../controllers/ordersController');

router.get('/', (req, res) => {
	res.render('member/setting/setting.hbs', {
		layout: 'admin-layout',
		isMember: true,
		adminContentHeader: 'Setting',
		breadcrumbs: [
			{title: "Setting", link: "#"}
		]
	})
});

router.get('/:id/edit', (req, res) => {
	res.render('member/setting/edit-setting.hbs', {
		layout: 'admin-layout',
		isMember: true,
		adminContentHeader: 'Edit Setting',
		breadcrumbs: [
			{title: "Setting", link: "/member/setting"},
			{title: "Edit Setting", link: "#"}
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
