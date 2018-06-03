var express = require('express');
var router = express.Router();
var models = require('../models');

var productsController = require('../controllers/productsController');
router.get('/', (req, res) => {
	var is_member=false;
	var name="";
	if(req.user) name=req.user.last_name;
	if(req.isAuthenticated()) is_member=true;

	page = parseInt(req.query.page);
    limit = 8;
    productLimit = 24;
    // test = [1, 2, 3];
    // test = JSON.stringify(test);
    // test = JSON.parse(test);
      productsController.getAll(function(objects){
          // numRows = objects.length;
          numRows = productLimit;
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
          }
		  res.render('home.hbs', {
		    products: objects,
	  		activeHome: true,
	  		isMember: is_member,
	  		name:name,
	  		breadcrumbs: [
	  			{title: "Home", link: "/"}
	  		],
            pagination: { page: page, limit: limit ,totalRows: numRows }
	      });
      });
});

module.exports = router;
