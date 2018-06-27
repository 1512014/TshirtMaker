var express = require('express');
var router = express.Router();
var models = require('../models');

var productsController = require('../controllers/productsController');
var productTypesController = require('../controllers/productTypesController');

router.get('/', (req, res) => {
	var is_member=false;
	var name="";
	if(req.user) name=req.user.lastName;
	if(req.isAuthenticated()) is_member=true;
	page = parseInt(req.query.page);
    limit = 8;
    productLimit = 24;
    // test = [1, 2, 3];
    // test = JSON.stringify(test);
    // test = JSON.parse(test);
      productsController.getAll(function(objects){
          // numRows = objects.length;
		  productLimit = (objects.length < productLimit)? objects.length:productLimit;
          numRows = productLimit;
          if(!page){
              page = 1;
          }
          objects = objects.slice((page-1)*limit, page*limit);
          for (var i = 0; i<objects.length; i++){
              if (i % 4 == 3){
                  objects[i].isBreakLine = true;
              } else {
                  objects[i].isBreakLine = false;
              }
              objects[i].discountPrice = objects[i].price * (100 - objects[i].discount) / 100;
              objects[i].discountAmount = objects[i].price * objects[i].discount / 100;
			  objects[i].minSizeLatin = productsController.getSize(objects[i].minSize);
			  objects[i].maxSizeLatin = productsController.getSize(objects[i].maxSize);
          }
		  res.render('home.hbs', {
		    products: objects,
	  		activeHome: true,
	  		isMember: is_member,
	  		name:name,
	  		breadcrumbs: [
	  			{title: "Home", link: "/"}
	  		],
            pagination: { page: page, limit: limit ,totalRows: numRows }
	      });
      });
});

router.get('/design', (req, res) => {
	var gender = req.query.gender;
	var is_member=false;
	var name="";
	if(req.user) name=req.user.lastName;
	if(req.isAuthenticated()) is_member=true;
	if (!gender){
		gender = 'male';
	}
	var product = [];
	var sizes = [];
	productTypesController.getProductTypesByGender('male', function(maleTypes){
		productTypesController.getProductTypesByGender('female', function(femaleTypes){
			for (var i = 0; i <= 7; i++){
				sizes.push({
					sizeNumber: i,
					sizeLatin: productsController.getSize(i)
				});
			}
			res.render('design.hbs', {
				isMember: is_member,
	  			name:name,
				maleTypes: maleTypes,
				femaleTypes: femaleTypes,
				gender: gender,
				sizes: sizes,
				pageHeader: true,
				activeDesign: true,
				breadcrumbs: [
					{title: "Design", link: "/design"}
				]
			});
		});
	});
});

router.get('/contact', (req, res) => {
	var is_member=false;
	var name="";
	if(req.user) name=req.user.lastName;
	if(req.isAuthenticated()) is_member=true;
    res.render('contact.hbs', {
		isMember: is_member,
	  	name:name,
		pageHeader: false,
		cssContact: true,
		activeContact: true,
		breadcrumbs: [
			{title: "Contact", link: "/contact"}
		]
    });
});

router.get('/about-us', (req, res) => {
	var is_member=false;
	var name="";
	if(req.user) name=req.user.lastName;
	if(req.isAuthenticated()) is_member=true;
    res.render('about-us.hbs', {
		isMember: is_member,
	  	name:name,
		pageHeader: false,
		cssAboutUs: true,
		activeAboutUs: true,
		breadcrumbs: [
			{title: "About Us", link: "/about-us"}
		]
    });
});


router.get('/login', (req, res) => {
    res.render('auth/login.hbs', {
		pageHeader: false,
		activeLogin: true,
		cssLogin: true,
		hideBreadcrumb: true,
		message: req.flash('loginMessage'),
		breadcrumbs:[
			{title: "Login", link: "/login"}
		]
    });
});

router.get('/register', (req, res) => {
    res.render('auth/register.hbs', {
		pageHeader: false,
		activeRegister: true,
		cssRegister: true,
		message: req.flash('registerMessage'),
		breadcrumbs:[
			{title: "Register", link: "/register"}
		]
    });
});

module.exports = router;
