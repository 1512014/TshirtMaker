var express = require('express');
var router = express.Router();
var models = require('../../models');

const multer = require("multer");
const upload = multer({
  dest:__dirname + "/../../public/img/uploads/"
});
const fs = require("fs");
const path = require("path");

var ordersController = require('../../controllers/ordersController');
var productsController = require('../../controllers/productsController');
router.get('/', (req, res) => {
	var message = req.session.message;
  	req.session.message = null;
	productsController.getAllProductTypes(function(objects){
		var productTypes = objects;
		res.render('admin/product_types/list-product-types.hbs', {
			productTypes: productTypes,
			message: message,
			layout: 'admin-layout',
			addNewPage: '/admin/product-types/create',
			adminContentHeader: 'All Product Types',
			breadcrumbs: [
				{title: "Product Types", link: "/admin/product-types"}
			]
		})
	});
});

router.get('/create', (req, res) => {
	res.render('admin/product_types/new-product-type.hbs', {
		layout: 'admin-layout',
		adminContentHeader: 'New Product Type',
		breadcrumbs: [
			{title: "Product Types", link: "/admin/product-types"},
			{title: "New Product Type", link: "/admin/product-types/create"}
		]
	})
});

router.post("/create", upload.fields([{ name: 'templateFront', maxCount: 1 },  { name: 'templateBack', maxCount: 1 }]), (req, res) => {
	var productTypeName = req.body.productTypeName;
	var gender = req.body.gender;

	var frontName = productTypeName.trim().replace(/\s\s+/g, '').replace(/ /g,"_").toLowerCase() + '_front' + path.extname(req.files['templateFront'][0].originalname).toLowerCase();
	var backName = productTypeName.trim().replace(/\s\s+/g, '').replace(/ /g,"_").toLowerCase() + '_back' + path.extname(req.files['templateBack'][0].originalname).toLowerCase();

	var tempFront = req.files['templateFront'][0].path;
	var tempBack = req.files['templateBack'][0].path;

	var templateFront = "/img/templates/male/" + frontName;
	var templateBack = "/img/templates/male/" + backName;

	var targetFront = path.join(__dirname, "/../../public/img/templates/male/" + frontName);
	var targetBack = path.join(__dirname, "/../../public/img/templates/male/" + backName);



	if (gender == 'female'){
		targetFront = path.join(__dirname, "/../../public/img/templates/female/" + frontName);
		targetBack = path.join(__dirname, "/../../public/img/templates/female/" + backName);
		templateFront = "/img/templates/female/" + frontName;
		templateBack = "/img/templates/female/" + backName;
	}

	fs.rename(tempFront, targetFront, err => {
		// if (err) return handleError(err, res);

		  // .status(200)
		  // .contentType("text/plain")
		  // .end("File uploaded!");
		  fs.rename(tempBack, targetBack, err => {

	  		object = {
	  			name: productTypeName,
	  			gender: gender,
	  			templateFront: templateFront,
	  			templateBack: templateBack,
	  			basicPrice: req.body.basicPrice
	  		}
	  		productsController.createProductType(object, function(message){
				req.session.message = "Create Successfully!";
 				res.redirect('/admin/product-types');
	  		});

	  	});
	});

});

router.post('/:id', function(req, res){
	// res.render('details', ...)
    id = req.params.id;
    productsController.deleteProductType(id, function(object){
		req.session.message = "Delete Successfully!";
		res.redirect('/admin/product-types');
	});
})

// router.post("/create", function (req, res) {
// 	var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//       var oldFrontPath = files.templateFront.path;
// 	  if (fields.gender == 'male'){
// 		  var newFrontPath = __dirname + '/../../public/img/templates/male/' + files.templateFront.name;
// 	  } else {
// 		  var newFrontPath = __dirname + '/../../public/img/templates/female/' + files.templateFront.name;
// 	  }
//
//       fs.rename(oldFrontPath, newFrontPath, function (err) {
//         if (err) throw err;
//         res.write('File uploaded and moved!');
//         res.end();
//       });
//   	});
// });

module.exports = router;
