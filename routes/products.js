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
        breadcrumbs = [];
        //Calculate discount price
        product.discountPrice = product.price * (100 - product.discount) / 100;
        product.discountAmount = product.price * product.discount / 100;

        //Change size from number to latin (EX: 1 -> XS, 2 -> S, 3 -> M, ...)
        product.minSizeLatin = productsController.getSize(product.minSize);
        product.maxSizeLatin = productsController.getSize(product.maxSize);

        //Get all types of a product
        typeIds = JSON.parse(product.types_id);
        productsController.getProductTypes(typeIds, function(objects){
            product.types = objects;
            product.listTypes = product.types.map(function(elem){
                breadcrumbs.push({title: elem.name, link: "#"});
                return elem.name;
            }).join(", ");
        });


        res.render('product-detail', {

            pageHeader: true,
    		cssProductDetail: true,
    		breadcrumbs: breadcrumbs,
            product: product,
            relatedProducts: relatedProducts
        });
    });
});

module.exports = router;
