var express = require('express');
var router = express.Router();
var models = require('../../models');
var validator = require('validator');

var usersController = require('../../controllers/usersController');

router.get('/', (req, res) => {
	var message = req.session.message;
	req.session.message = null;
	usersController.getById(req.user.id, function(user){
		res.render('member/profile/profile.hbs', {
			user: user,
			message: message,
			isMember: true,
			layout: 'admin-layout',
			adminContentHeader: 'Profile',
			breadcrumbs: [
				{title: "Profile", link: "#"}
			]
		})
	});

});

router.get('/edit', (req, res) => {
	var message = req.session.message;
	req.session.message = null;
	usersController.getById(req.user.id, function(user){
		res.render('member/profile/edit-profile.hbs', {
			user: user,
			message: message,
			isMember: true,
			layout: 'admin-layout',
			adminContentHeader: 'Edit Profile',
			breadcrumbs: [
				{title: "Profile", link: "/member/profile"},
				{title: "Edit Profile", link: "#"}
			]
		})
	});

});

router.post('/edit', (req, res) => {
	if (!validator.isNumeric(req.body.phoneNumber)){
		req.session.message = "Phone Number must be a number.";
		res.redirect('/member/profile/edit');
	}
	usersController.update(req.user.id, req.body, function(user){
		req.session.message = "Edit Successfully!";
		res.redirect('/member/profile');
	});

});

module.exports = router;
