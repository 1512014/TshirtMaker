var express = require('express');
var router = express.Router();
var models = require('../models');

//This code block is for uploading images
const multer = require("multer");
const upload = multer({
  dest:__dirname + "/../../public/img/uploads/"
});
const fs = require("fs");
const path = require("path");
//End codeblock

var productsController = require('../controllers/productsController');
var settingsController = require('../controllers/settingsController');
var designsController = require('../controllers/designsController');

router.get('/', function(req, res){
    page = parseInt(req.query.page);
    var is_member=false;
	var name="";
	if(req.user) name=req.user.lastName;
	if(req.isAuthenticated()) is_member=true;
    limit = 16;
    // test = [1, 2, 3];
    // test = JSON.stringify(test);
    // test = JSON.parse(test);
	productsController.getFilterOptions(function (filters) {
		productsController.getAll(function(objects){
			numRows = objects.length;
			if(!page){
				page = 1;
			}
			objects = objects.slice((page-1)*limit, page*limit);
			for (var i = 0; i<objects.length; i++){
				if (i % 4  == 0){
					objects[i].isStartLine = true;
				} else {
					objects[i].isStartLine = false;
				}
				if (i % 4  == 3){
					objects[i].isBreakLine = true;
				} else {
					objects[i].isBreakLine = false;
				}
				objects[i].discountPrice = objects[i].price * (100 - objects[i].discount) / 100;
				objects[i].discountAmount = objects[i].price * objects[i].discount / 100;

				objects[i].minSizeLatin = productsController.getSize(objects[i].minSize);
				objects[i].maxSizeLatin = productsController.getSize(objects[i].maxSize);
			}
			res.render('products.hbs', {
			  isMember: is_member,
			  name:name,
			  filters: filters,
			  products: objects,
			  pageHeader: true,
			  cssProduct: true,
			  activeProduct: true,
			  breadcrumbs: [
				  {title: "Products", link: "/products"}
			  ],
			  pagination: { page: page, limit: limit ,totalRows: numRows }
			});
		});
	});
});

router.get('/:id', function (req, res) {
    id = req.params.id;
	// numCart = req.
	if(req.user) name=req.user.lastName;
	if(req.isAuthenticated()) is_member=true;

    relatedProducts = [];
    productsController.getRelatedProduct(id, function (objects) {
        relatedProducts = objects;
        for (var key in relatedProducts){
            relatedProducts[key].discountPrice = relatedProducts[key].price * (100 - relatedProducts[key].discount) / 100;
        }
    });

    productsController.getById(id, function(object){
        product = object;
		product.type.gender = (product.type.gender == 'male')? 'Male':'Female';

        res.render('product-detail', {
			isMember: is_member,
            pageHeader: true,
    		cssProductDetail: true,
    		breadcrumbs: object.breadcrumbs,
            product: product,
            relatedProducts: relatedProducts
        });
    });
});

router.get('/:id/designFront', function(req, res){
	id = req.params.id;

	if(req.user) name=req.user.lastName;
	if(req.isAuthenticated()) is_member=true;

	var message  = req.session.message;
	req.session.message = null;
	productsController.getById(id, function(object){
        product = object;
        res.render('design-product.hbs', {
			product: product,
			designStep: 1,
			message: message,
            pageHeader: true,
			activeDesign: true,
			isMember: isMember,
			breadcrumbs: [
				{title: "Design", link: "/design"}
			]
        });
    });
})

router.get("/:id/designBack", (req, res) => {
	if(req.user) name=req.user.lastName;
	if(req.isAuthenticated()) is_member=true;
	var productId = req.params.id;
	var message  = req.session.message;
	req.session.message = null;
	productsController.getById(productId, function(object){
        product = object;
        res.render('design-product.hbs', {
			product: product,
			designStep: 2,
			message: message,
            pageHeader: true,
			activeDesign: true,
			isMember: is_member,
			breadcrumbs: [
				{title: "Design", link: "/design"}
			]
        });
    });
});

router.get('/:id/afterDesign', (req, res) => {
	if(req.user) name=req.user.lastName;
	if(req.isAuthenticated()) is_member=true;
	var id = req.params.id;
	var designId = req.session.designId;
	designsController.getById(designId, function(design){
		console.log("Hehehe: " + designId);
		res.render('after-design.hbs', {
			design: design,
			productId: id,
			designStep: 3,
			pageHeader: true,
			isMember: is_member,
			breadcrumbs: [
				{title: "Design", link: "/design"},
				{title: "Confirm", link: "#"}
			]
	    });
	});
});

router.get('/:id/finished', (req, res) => {
	if(req.user) name=req.user.lastName;
	if(req.isAuthenticated()) is_member=true;
	var id = req.params.id;
	req.session.designId = null;

	productsController.getById(id, function(object){
        product = object;
		settingsController.getAll(function(setting){
			totalPrice = product.price + setting.frontDesignPrice + setting.backDesignPrice;
			res.render('finished.hbs', {
				product: product,
				setting: setting,
				designStep: 3,
				totalPrice: totalPrice,
				pageHeader: true,
				isMember: is_member,
				breadcrumbs: [
					{title: "Design", link: "/design"},
					{title: "Confirm", link: "#"}
				]
		    });
		});
	});
});

router.post("/:id/saveFront", (req, res) => {
	var productId = req.params.id;
	var base64DataFront = req.body.canvasFront.replace(/^data:image\/png;base64,/, "");
	var size = req.body.size;

	var designName = Math.random().toString(36).substring(7);
	var frontName =	designName + '_front.png'

	// var target = path.join(__dirname, "/../../public/img/designs/" + designName);
	var targetFront = '/img/designs/' + frontName;

	fs.writeFile( 'public' + targetFront, base64DataFront, 'base64', function(err) {
		var object = {
			imageFront: targetFront,
			size: size

		};
		designsController.create(object, function(design){
			req.session.designId = design.id;
			req.session.message = "Front design saved successfully!";
			res.redirect('/products/' + productId + '/designBack');
		});
	});
});

router.post("/:id/saveBack", (req, res) => {
	var productId = req.params.id;
	var designId = req.session.designId;
	var base64DataBack = req.body.canvasBack.replace(/^data:image\/png;base64,/, "");
	var size = req.body.size;

	var designName = Math.random().toString(36).substring(7);
	var backName =	designName + '_back.png'

	var targetBack = '/img/designs/' + backName;

	fs.writeFile( 'public' + targetBack, base64DataBack, 'base64', function(err) {
		var object = {
			imageBack: targetBack,
			size: size
		};
		designsController.update(designId, object, function(design){
			req.session.designId = designId;
			req.session.message = "Save back design successfully!";
			res.redirect('/products/' + productId + '/afterDesign');
		});

	});

});


router.post("/:id/saveCanvas", (req, res) => {
	var productId = req.params.id;
	var base64DataFront = req.body.canvasFront.replace(/^data:image\/png;base64,/, "");
	var base64DataBack = req.body.canvasBack.replace(/^data:image\/png;base64,/, "");
	var size = req.body.size;

	var designName = Math.random().toString(36).substring(7);
	var frontName =	designName + '_front.png'
	var backName =	designName + '_back.png'

	// var target = path.join(__dirname, "/../../public/img/designs/" + designName);
	var targetFront = '/img/designs/' + frontName;
	var targetBack = '/img/designs/' + backName;

	fs.writeFile( 'public' + targetFront, base64DataFront, 'base64', function(err) {
		fs.writeFile( 'public' + targetBack, base64DataBack, 'base64', function(err) {
			var object = {
				imageFront: targetFront,
				imageBack: targetBack,
				size: size

			};
			designsController.create(object, function(design){
				req.session.designId = design.id;
				req.session.message = "Save design successfully!";
				res.redirect('/products/' + productId + '/finished');
			});

		});
	});
});

module.exports = router;
