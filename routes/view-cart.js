var express = require('express');
var router = express.Router();
var models = require('../models');

var ordersController = require('../controllers/ordersController');
var productsController = require('../controllers/productsController');
router.get('/', function(req, res){
    page = parseInt(req.query.page);
    status = req.query.orderStatus;
    userId = 1; //TODO: change later
    if (!status) status = 1; //Pending status
    limit = 100;
    orders = [];
    products = [];
    totalPrice = {subtotal: 0, total: 0};

    ordersController.getAllByUserId(userId, status, function(objects){
      numRows = objects.length;
      if(!page){
          page = 1;
      }
      orders = objects.slice((page-1)*limit, page*limit);

    //Each order contains ONE product
      for (var i = 0; i < orders.length; i++){

          order = orders[i];
          //Get extras
          extraIds = JSON.parse(orders[i].extras_id);
          productId = orders[i].product_id;
          productQty = orders[i].product_qty;
          productSize = productsController.getSize(orders[i].product_size);
          productsController.getProductFromOrder(order, productId, productQty, productSize, extraIds, function(product){
              products.push(product);
          });

          //Get totalPrice
          tempSubtotal = orders[i].subtotal * productQty +  orders[i].shipping
          totalPrice.subtotal += tempSubtotal; //TODO: add extra price
          totalPrice.total += tempSubtotal + tempSubtotal * orders[i].tax / 100;

      }


      setTimeout(()=>{
          res.render('view-cart.hbs', {
            products: products,
            totalPrice: totalPrice,
      		pageHeader: true,
      		cssViewCart: true,
      		breadcrumbs: [
      			{title: "View Cart", link: "/view-cart"}
      		],
            pagination: { page: page, limit: limit ,totalRows: numRows }
          });
      }, 1000);
    });
});

// router.get('/:id', function (req, res) {
//     id = req.params.id;
//
//     relatedProducts = [];
//     ordersController.getRelatedProduct(function (objects) {
//         relatedProducts = objects;
//         for (var key in relatedProducts){
//             relatedProducts[key].discountPrice = relatedProducts[key].price * (100 - relatedProducts[key].discount) / 100;
//         }
//     });
//
//     ordersController.getById(id, function(object){
//         product = object;
//         breadcrumbs = [];
//         //Calculate discount price
//         product.discountPrice = product.price * (100 - product.discount) / 100;
//         product.discountAmount = product.price * product.discount / 100;
//
//         //Change size from number to latin (EX: 1 -> XS, 2 -> S, 3 -> M, ...)
//         product.minSizeLatin = ordersController.getSize(product.minSize);
//         product.maxSizeLatin = ordersController.getSize(product.maxSize);
//
//         //Get all types of a product
//         typeIds = JSON.parse(product.types_id);
//         ordersController.getProductTypes(typeIds, function(objects){
//             product.types = objects;
//             product.listTypes = product.types.map(function(elem){
//                 breadcrumbs.push({title: elem.name, link: "#"});
//                 return elem.name;
//             }).join(", ");
//         });
//
//
//         res.render('product-detail', {
//
//             pageHeader: true,
//     		cssProductDetail: true,
//     		breadcrumbs: breadcrumbs,
//             product: product,
//             relatedProducts: relatedProducts
//         });
//     });
// // });

module.exports = router;
