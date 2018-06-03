var express = require('express');
var router = express.Router();
var models = require('../models');

var extrasController = require('../controllers/extrasController');

router.get('/', function(req, res){
    extrasController.getAll(function(extras){
        res.send(extras);
    });
})

module.exports = router;
