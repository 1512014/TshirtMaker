var Sequelize = require('sequelize');
const Op = Sequelize.Op;

var controller = {};
var models = require('../models');
var settingsController = require('../controllers/settingsController');
var productTypesController = require('../controllers/productTypesController');
var productsController = require('../controllers/productsController');
var usersController = require('../controllers/usersController');
var designsController = require('../controllers/designsController');

controller.getAll = function(callback){
    models.Order
    .findAll({
		where: {
			status: {[Op.not]: 'deleted'}
		}
	})
    .then(function(orders){
		orders.forEach(function(order){
			productsController.getById(order.productId, function(product){
				order.product = product;
				settingsController.getAll(function(settings){
					order.subtotal = order.product.discountPrice + settings.frontDesignPrice + settings.backDesignPrice;
					order.total = order.subtotal + order.subtotal * settings.tax / 100;
				})
			});
			usersController.getById(order.userId, function(user){
				order.user = user;
			});
		});

		setTimeout(callback, 1000, orders);

    })
};

controller.getById = function(id, callback){
    models.Order
    .findOne({
		where: {
			id: id
		}
	})
    .then(function(order){
		productsController.getById(order.productId, function(product){
			order.product = product;
			settingsController.getAll(function(settings){
				order.subtotal = order.product.discountPrice + settings.frontDesignPrice + settings.backDesignPrice;
				order.total = order.subtotal + order.subtotal * settings.tax / 100;
			})
		});
		usersController.getById(order.userId, function(user){
			order.user = user;
		});
		designsController.getById(order.designId, function(design){
			order.design = design;
		});
		settingsController.getSetting('tax', function(tax){
			order.tax = tax;
		});
		settingsController.getSetting('frontDesignPrice', function(front){
			order.frontDesignPrice = front;
		});
		settingsController.getSetting('backDesignPrice', function(back){
			order.backDesignPrice = back;
		});

		setTimeout(callback, 1000, order);
    })
};

controller.getAllByUserId = function(userId, statuses, callback){
    models.Order
    .findAll({
        where: {
			status: {[Op.in]: statuses},
            userId: userId
        },
        order: [
            ['id', 'DESC']
        ]
    })
    .then(function(orders){
		orders.forEach(function(order){
			productsController.getById(order.productId, function(product){
				order.product = product;
				settingsController.getAll(function(settings){
					order.subtotal = order.product.discountPrice + settings.frontDesignPrice + settings.backDesignPrice;
					order.total = order.subtotal + order.subtotal * settings.tax / 100;
				})
			});
			usersController.getById(order.userId, function(user){
				order.user = user;
			});
			designsController.getById(order.designId, function(design){
				order.design = design;
			});
		});

		setTimeout(callback, 1000, orders);
    })
};

controller.updateAllByUserId = function(userId, status1,status2, callback){
    models.Order
	.update({status:status2},
		{where: {
			status:  status1,
            userId: userId
		},
		returning: true,
  		plain: true
    })
    .then(function(orders){
		console.log(orders);
    });
};

controller.getAllByCode = function(orderCode, callback){
	models.Order
    .findAll({
        where: {
			status: {[Op.in]: ['processing', 'delivered']},
            orderCode: orderCode
        },
        order: [
            ['id', 'DESC']
        ]
    })
    .then(function(orders){
		orders.forEach(function(order){
			productsController.getById(order.productId, function(product){
				order.product = product;
				settingsController.getAll(function(settings){
					order.subtotal = order.product.discountPrice + settings.frontDesignPrice + settings.backDesignPrice;
					order.total = order.subtotal + order.subtotal * settings.tax / 100;
				})
			});
			usersController.getById(order.userId, function(user){
				order.user = user;
			});
			designsController.getById(order.designId, function(design){
				order.design = design;
			});
		});

		setTimeout(callback, 1000, orders);
    })
}

// controller.addNew = function(comment, articleId, callback){
//     models.Comment
//     .create({
//         comment: comment,
//         ArticleId: articleId
//     })
//     .then(function(comments){
//         callback(comments);
//     })
// };

controller.delete = function(id, callback){
    models.Order
    .destroy({
        where: {id:id}
    })
    .then(function(order){
        callback(order);
    })
};

controller.update = function(id, object, callback){
    models.Order
    .update(
        object,
        { where: {id: id} }
    )
    .then(function(order){
        callback(order);
    })
};

// controller.update = function(id, comment, callback){
//     models.Comment
//     .update(
//         {
//             comment: comment
//         },
//         { where: {id: id} }
//     )
//     .then(function(comment){
//         callback(comment);
//     })
// };

module.exports = controller;
