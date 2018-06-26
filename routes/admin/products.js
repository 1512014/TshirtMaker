var express = require('express');
var router = express.Router();
var models = require('../../models');

//This code block is for uploading images
const multer = require("multer");
const upload = multer({
  dest:__dirname + "/../../public/img/uploads/"
});
const fs = require("fs");
const path = require("path");
//End codeblock


var productsController = require('../../controllers/productsController');
var productTypesController = require('../../controllers/productTypesController');

router.get('/', (req, res) => {
	var message = req.session.message;
	req.session.message = null;
	productsController.getAll(function(products){
		res.render('admin/products/list-products.hbs', {
			products: products,
			message: message,
			layout: 'admin-layout',
			addNewPage: '/admin/products/create',
			adminContentHeader: 'All Products',
			breadcrumbs: [
				{title: "Products", link: "/admin/products/"}
			]
		})
	});
});

// router.get('/:id', (req, res) => {
//
// });

router.get('/create', (req, res) => {
	var message = req.session.message;
	req.session.message = null;
	productTypesController.getAllProductTypes(function(types){
		sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
		res.render('admin/products/new-product.hbs', {
			message: message,
			sizes: sizes,
			productTypes: types,
			layout: 'admin-layout',
			adminContentHeader: 'New Product',
			breadcrumbs: [
				{title: "Products", link: "/admin/products/"},
				{title: "New Product", link: "/admin/products/create"}
			]
		})
	})

});

router.post("/create", upload.fields([{ name: 'image1', maxCount: 1 },  { name: 'image2', maxCount: 1 }]), (req, res) => {
	if (!req.files['image1']){
		req.session.message = "Image 1 is requied.";
		res.redirect('/admin/products/create');
		return;
	}
	var name = req.body.name;

	var image1Name = name.trim().replace(/\s\s+/g, '').replace(/ /g,"_").toLowerCase() + '_image1' + path.extname(req.files['image1'][0].originalname).toLowerCase();
	var tempImage1 = req.files['image1'][0].path;
	var image1 = "/img/products/" + image1Name;
	var targetImage1 = path.join(__dirname, "/../../public/img/products/" + image1Name);

	var image2 = "";
	if (req.files['image2']){
		var image2Name = name.trim().replace(/\s\s+/g, '').replace(/ /g,"_").toLowerCase() + '_image2' + path.extname(req.files['image2'][0].originalname).toLowerCase();
		var tempImage2 = req.files['image2'][0].path;
		var image2 = "/img/products/" + image2Name;
		var targetImage2 = path.join(__dirname, "/../../public/img/products/" + image2Name);
		fs.rename(tempImage2, targetImage2, err => {
			// if (err) return handleError(err, res);

			  // .status(200)
			  // .contentType("text/plain")
			  // .end("File uploaded!");
		  });
	}

  	fs.rename(tempImage1, targetImage1, err => {
		console.log(err);
		var color = req.body.color ? req.body.color : '#ffffff';

		object = {
			name: name,
			typeId: req.body.typeId,
			qty: req.body.qty,
			minSize: req.body.minSize,
			maxSize: req.body.maxSize,
			imagePath1: image1,
			imagePath2: image2,
			color: color,
			price: req.body.price,
			discount: req.body.discount,
			description: req.body.description
		}
		productsController.createProduct(object, function(message){
		req.session.message = "Product Created Successfully!";
			res.redirect('/admin/products');
		});

    });

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
