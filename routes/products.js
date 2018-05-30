var express = require('express');
var router = express.Router();

var productsController = require('../controllers/productsController');
router.get('/', function(req, res){
      productsController.getAll(function(objects){
          res.render('test', {
              products: objects
          });
      });
});

module.exports = router;
