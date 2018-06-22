var express = require('express');
var router = express.Router();
var models = require('../models');

// var productsController = require('../controllers/productsController');
router.get('/', (req, res) => {
	gender = req.query.gender;
	if (!gender){
		gender = 'male';
	}
    res.render('design.hbs', {
		gender: gender,
		pageHeader: true,
		activeDesign: true,
		breadcrumbs: [
			{title: "Design", link: "/design"}
		]
    });
});

module.exports = router;
