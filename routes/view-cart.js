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
    products = [];
    totalPrice = {subtotal: 0, total: 0};
    // orders = [];
    // products = [];
    // productExtra = [];
    // totalPrice = {subtotal: 0, total: 0};

    ordersController.getAllByUserId(userId, status, function(objects){
      numRows = objects.length;
      if(!page){
          page = 1;
      }
      orders = objects.slice((page-1)*limit, page*limit);
      if(orders.length==0){
          var product=[{}];
        res.render('view-cart.hbs', {
            products: {},
            pageHeader: true,
            cssViewCart: true,
            breadcrumbs: [
                {title: "View Cart", link: "/view-cart"}
            ],
            pagination: { page: page, limit: limit ,totalRows: numRows }
          });
      }
      for (var i = 0; i < orders.length; i++){
          extraIds = JSON.parse(orders[i].extras_id);
          productsController.getProductFromOrder(orders[i], products, totalPrice, extraIds, function(object){
              if (object.products.length == orders.length) {
                  res.render('view-cart.hbs', {
                    products: object.products,
                    totalPrice: object.totalPrice,
                    nOrders: orders.length,
                    pageHeader: true,
                    cssViewCart: true,
                    breadcrumbs: [
                        {title: "View Cart", link: "/view-cart"}
                    ],
                    pagination: { page: page, limit: limit ,totalRows: numRows }
                  });
              }
          });
      }

  });
});

module.exports = router;
