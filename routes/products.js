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

            pageHeader: true,
    		cssProductDetail: true,
    		breadcrumbs: object.breadcrumbs,
            product: product,
            relatedProducts: relatedProducts
        });
    });
});

router.get('/:id/design', function(req, res){
	id = req.params.id;

	productsController.getById(id, function(object){
        product = object;
        res.render('design-product.hbs', {
			product: product,
            pageHeader: true,
			activeDesign: true,
			breadcrumbs: [
				{title: "Design", link: "/design"}
			]
        });
    });
})

router.get('/:id/finished', (req, res) => {
	id = req.params.id;
	productsController.getById(id, function(object){
        product = object;
		settingsController.getAll(function(setting){
			totalPrice = product.price + setting.frontDesignPrice + setting.backDesignPrice;
			res.render('finish-design.hbs', {
				product: product,
				setting: setting,
				totalPrice: totalPrice,
				pageHeader: true,
				breadcrumbs: [
					{title: "Design", link: "/design"},
					{title: "Confirm", link: "#"}
				]
		    });
		})
	});
});

router.post("/createDesign", upload.fields([{ name: 'image', maxCount: 1 }]), (req, res) => {
	var base64Data = req.rawBody.replace(/^data:image\/png;base64,/, "");

	fs.writeFile("out.png", base64Data, 'base64', function(err) {
  	console.log(err);
	});
	// var designName = "helooooo.png";
	// var temp = req.files['image'][0].path;
	//
	// var target = path.join(__dirname, "/../../public/img/designs/" + frontName);
	//
	// fs.rename(temp, target, err => {
	// });
});




module.exports = router;
