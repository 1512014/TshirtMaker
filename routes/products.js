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
        product.discountPrice = product.price * (100 - product.discount) / 100;
        product.discountAmount = product.price * product.discount / 100;
        product.minSizeLatin = productsController.getSize(product.minSize);
        product.maxSizeLatin = productsController.getSize(product.maxSize);

        res.render('product-detail', {

            pageHeader: true,
    		cssProductDetail: true,
    		breadcrumbs: [
    			{title: "Men", link: "#"},
    			{title: "Long Shirt", link: "#"},
    			{title: "White T-shirt", link: "#"}
    		],
            product: product,
            relatedProducts: relatedProducts
        });
    });
});

module.exports = router;
