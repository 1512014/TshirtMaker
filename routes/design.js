var express = require('express');
var router = express.Router();
var models = require('../models');

var productsController = require('../controllers/productsController');
router.get('/', (req, res) => {
	gender = req.query.gender;
	if (!gender){
		gender = 'male';
	}
	var product = [];
	product.sizes = [];
	for (var i = 0; i <= 7; i++){
		product.sizes.push({
			sizeNumber: i,
			sizeLatin: productsController.getSize(i)
		});
	}
    res.render('design.hbs', {
		gender: gender,
		product: product,
		pageHeader: true,
		activeDesign: true,
		breadcrumbs: [
			{title: "Design", link: "/design"}
		]
    });
});

module.exports = router;
