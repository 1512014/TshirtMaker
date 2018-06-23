var express = require('express');
var router = express.Router();
var models = require('../models');

var productsController = require('../controllers/productsController');
router.get('/', function(req, res){
    page = parseInt(req.query.page);
    limit = 16;
    // test = [1, 2, 3];
    // test = JSON.stringify(test);
    // test = JSON.parse(test);
      productsController.getAll(function(objects){
          numRows = objects.length;
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
          res.render('products.hbs', {
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

router.get('/:id', function (req, res) {
    id = req.params.id;

    relatedProducts = [];
    productsController.getRelatedProduct(function (objects) {
        relatedProducts = objects;
        for (var key in relatedProducts){
            relatedProducts[key].discountPrice = relatedProducts[key].price * (100 - relatedProducts[key].discount) / 100;
        }
    });

    productsController.getById(id, function(object){
        product = object;

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
	gender = req.query.gender;
	if (!gender){
		gender = 'male';
	}

	productsController.getById(id, function(object){
        product = object;
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
})

module.exports = router;
