var express = require('express');
var router = express.Router();

var productsController = require('../controllers/productsController');
router.get('/', function(req, res){
      productsController.getAll(function(objects){
          res.render('products.hbs', {
            products: objects,
      		pageHeader: true,
      		cssProduct: true,
      		activeProduct: true,
      		breadcrumbs: [
      			{title: "Products", link: "/products"}
      		]
          });
      });
});

router.get('/:id', function (req, res) {
    id = req.params.id;
    // page = req.query.page;
    // limit = 5;
    productsController.getById(id, function(object){
        // numRows = article.Comments.length;
        // if(!page){
        //     page = 1;
        // }
        // comments = article.Comments.slice((page-1)*5, page*5);

        res.render('product-detail', {
            // pagination: { page: page, limit: limit ,totalRows: numRows },
            pageHeader: true,
    		cssProductDetail: true,
    		breadcrumbs: [
    			{title: "Men", link: "#"},
    			{title: "Long Shirt", link: "#"},
    			{title: "White T-shirt", link: "#"}
    		],
            product: object
        });
    });
});

module.exports = router;
