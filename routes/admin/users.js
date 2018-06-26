var express = require('express');
var router = express.Router();
var models = require('../../models');

var usersController = require('../../controllers/usersController');

router.get('/', (req, res) => {
	usersController.getAll(function(users){
		res.render('admin/users/list-users.hbs', {
			users: users,
			layout: 'admin-layout',
			addNewPage: '/admin/users/create',
			adminContentHeader: 'All Users',
			breadcrumbs: [
				{title: "All Users", link: "/admin/users"}
			]
		})
	})

});

router.get('/:id', (req, res) => {
	var id = req.params.id;
	usersController.getById(id, function(user){
		res.render('admin/users/detail-user.hbs', {
			user: user,
			layout: 'admin-layout',
			adminContentHeader: 'User Detail',
			breadcrumbs: [
				{title: "Users", link: "/admin/users"},
				{title: "User Detail", link: "#"}
			]
		})
	});

});

router.put('/:id', function(req, res){
    id = req.params.id;

    usersController.update(id, req.body, function(comment){
        res.send({status:"success"});
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
