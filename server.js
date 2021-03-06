const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const path = require("path");
const fs = require("fs");
const formidable = require('formidable');
const multer = require("multer");
const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};
const upload = multer({
    dest: "/public/img/uploads"
});
const csrf = require('csurf');
var cookieParser = require('cookie-parser')
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var qs = require('querystring');

var app = express();
var expressHbs = require('express-handlebars');
var Handlebars = require('handlebars');
var HandlebarsIntl = require('handlebars-intl');
var paginateHelper = require('express-handlebars-paginate');
var ordersController = require('./controllers/ordersController');
var productsController = require('./controllers/productsController');
var settingsController = require('./controllers/settingsController');
var usersController = require('./controllers/usersController');
var orders = require('./models/order');
var hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers: {
        paginate: paginateHelper.createPagination,
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
    }
});
hbs.handlebars.registerHelper('paginateHelper', paginateHelper.createPagination);
Handlebars.registerHelper('isMember', function (role) {

});
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});
HandlebarsIntl.registerWith(Handlebars);
app.use(cookieParser());
app.engine('hbs', hbs.engine);
app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'ilovescotchscotchyscotchscotch', cookie: { maxAge: 6000000 } })); // session secret
app.use(passport.initialize());
app.use(passport.session({ secret: 'keyboard cat', cookie: { maxAge: 6000000 } })); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Routes

var authRoute = require('./routes/auth.js')(app, passport);


//load passport strategies

require('./config/passport.js')(passport, models.User);

app.get("/", express.static(path.join(__dirname, "./public")));

app.get('/sync', function (req, res) {
    models.sequelize.sync().then(function () {
        res.send('database sync completed!');
    });
});

var home = require('./routes/home');
app.use('/', home);

var products = require('./routes/products');
app.use('/products', products);

var orders = require('./routes/orders');
app.use('/orders', orders);

var paypal = require('./routes/paypal');
app.use('/paypal', paypal);

var cart = require('./routes/view-cart');
app.use('/view-cart', cart);

var vnpay = require('./routes/vnpay');
app.use('/vnpay', vnpay);

var admin = require('./routes/admin/admin');
app.use('/admin', admin);
var member = require('./routes/member/member');
app.use('/member', member);


app.post('/payment', (req, res) => {
    method = req.body.payment_method;
    total = req.body.total;
    var userId = req.user ? req.user.id : req.session.guestId;
    if (method == 'paypal') res.redirect('/paypal' + '?total=' + total + '&id=' + userId);
    else if (method == 'vnpay') res.redirect('/vnpay' + '?total=' + total + '&id=' + userId);
    else if (method == 'cod') {
        var userId = req.body.userId;
        ordersController.updateAllByUserId(userId, 'pending', 'processing', 'COD', function (objects) {
        })
        res.render('success.hbs', {
            pageHeader: true,
            //cssCheckOutStep2: true,
            hideBreadcrumb: true,
            code: true
        });

    }
    else redirect('/');
});
app.post('/checkout2', (req, res) => {
    var userId = req.user ? req.user.id : req.session.guestId;
    products = [];
    statuses = ['pending'];
    totalPrice = { subtotal: 0, total: 0 };
    settingsController.getAll(function (settings) {
        ordersController.getAllByUserId(userId, statuses, function (objects) {
            orders = objects;
            var totalPrice = {
                subtotal: 0,
                total: 0
            };

            var is_member = false;
            if (req.isAuthenticated()) is_member = true;
            var name = "";
            if (req.user) name = req.user.lastName;
			for (var i in orders) {
                totalPrice.subtotal += orders[i].subtotal * orders[i].productQty;
				if (orders[i].product.name.length > 16){
					orders[i].product.name = orders[i].product.name.slice(0, 16) + '...'
				}
            }
            totalPrice.total = totalPrice.subtotal + totalPrice.subtotal * settings.tax / 100;

            res.render('checkout-step2.hbs', {
                isMember: is_member,
                name: name,
                userId: userId,
                orders: orders,
                settings: settings,
                totalPrice: totalPrice,
                nOrders: orders.length,
                pageHeader: false,
                cssCheckOutStep2: true,
				isMember: is_member,
                hideBreadcrumb: true,
            });
        });
    });
    console.log(req.body);
})

app.post('/checkout3', (req, res) => {
    var userId = req.user ? req.user.id : req.session.guestId;
    name1 = req.body.firstname;
    email = req.body.email;
    state = req.body.state;
    zip = req.body.zip;
    address = req.body.address;
    city = req.body.city;
    payment_method = req.body.payment_method;
    models.User
        .update(
            {
                firstName: name1,
                email: email,
                city:city,
                address:address
            },
            { where: { id: userId } }
        )
        .then(function (object) {

        })
    newCode= Math.floor(Math.random() * 10000);
    models.Order
    .update(
        {orderCode:newCode},
        {where: {userId:userId}}
    ).then(function (object) {

    })
    statuses = ['pending'];
    products = [];
    totalPrice = { subtotal: 0, total: 0 };
    settingsController.getAll(function (settings) {
        ordersController.getAllByUserId(userId, statuses, function (objects) {
            orders = objects;
            var totalPrice = {
                subtotal: 0,
                total: 0
            };
            for (var i in orders) {
                totalPrice.subtotal += orders[i].subtotal * orders[i].productQty;
            }
            totalPrice.total = totalPrice.subtotal + totalPrice.subtotal * settings.tax / 100;
            var n = parseFloat(totalPrice.total);
            totalPrice.total = Math.round(n * 100) / 100;
            n = parseFloat(totalPrice.subtotal);
            totalPrice.subtotal = Math.round(n * 100) / 100;
            var is_member = false;
            if (req.isAuthenticated()) is_member = true;
            var name = "";
            if (req.user) name = req.user.lastName;
            res.render('checkout-step3.hbs', {
                name1: name1,
                isMember: is_member,
                name: name,
                email: email,
                state: state,
                zip: zip,
                address: address,
                city: city,
                payment_method: payment_method,
                userId: userId,
                orders: orders,
                settings: settings,
                totalPrice: totalPrice,
                nOrders: orders.length,
                pageHeader: false,
                cssCheckOutStep2: true,
                hideBreadcrumb: true
            });

        });
        console.log(req.body);
    })
});

app.get('/checkout-step2', (req, res) => {
	if(req.user) name=req.user.lastName;
	if(req.isAuthenticated()) is_member=true;
    res.render('checkout-step2.hbs', {
        pageHeader: false,
        cssCheckOutStep2: true,
		isMember: is_member,
        hideBreadcrumb: true
    });
});
app.get('/checkout-step3', (req, res) => {
	if(req.user) name=req.user.lastName;
	if(req.isAuthenticated()) is_member=true;
    res.render('checkout-step3.hbs', {
        payment_method: req.param('payment_method'),
        pageHeader: false,
        cssCheckOutStep3: true,
        cssProductDetail: true,
        cssViewCart: true,
		isMember: is_member,
        hideBreadcrumb: true
    });
});

app.get('/userprofile',(req,res)=>{
	var userId = 0;
    if(req.user)
		userId = req.user.id;
    usersController.getRole(userId,function(err,role){
		if(role==='user'){
            res.redirect('/member');
        }
        else if (role === 'admin') {
            res.redirect('/admin');
        }
        else res.redirect('/');
    });

})

app.listen(app.get('port'), function () {
    console.log('Server is listening at port ' + app.get('port'));
});
