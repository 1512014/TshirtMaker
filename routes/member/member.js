var express = require('express');
var router = express.Router();
var models = require('../../models');
var bCrypt = require('bcrypt-nodejs');

var usersController = require('../../controllers/usersController');

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
	var message = req.session.message;
  	req.session.message = null;
	var error = req.session.error;
  	req.session.error = null;
    res.render('member/change-password.hbs', {
		message: message,
		error: error,
		layout: 'admin-layout',
		isMember: true,
		adminContentHeader: 'Change Password',
	    breadcrumbs: [
	        {title: "Change Password", link: "#"}
	    ]
	});
});

router.post('/change-password', (req, res) => {
	var userId = 1; // TODO: Change to userId
	usersController.getById(userId, function(user){
		var oldPassword = req.body.currentPassword;
		var newPassword = req.body.newPassword;
		var confirmPassword = req.body.confirmPassword;

		if (newPassword  != confirmPassword) {
			req.session.error = "Confirm password not match!";
			res.redirect('/member/change-password');
		}

		if (bCrypt.compareSync(oldPassword, user.password)){
			var object = {
				password: bCrypt.hashSync(newPassword, bCrypt.genSaltSync(8), null)
			}
			usersController.update(userId, object, function(user){
				req.session.message = "Successfully change password!";
				res.redirect('/member/change-password');
			})
		} else {
			req.session.error = "Old password not correct!";
			res.redirect('/member/change-password');
		}


	});
});

var profile = require('./profile');
router.use('/profile', profile);
var orders = require('./orders');
router.use('/orders', orders);

module.exports = router;
