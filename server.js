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
var passport = require('passport');
var flash    = require('connect-flash');
var session      = require('express-session');
var qs = require('querystring');

var app = express();
var expressHbs = require('express-handlebars');
var Handlebars     = require('handlebars');
var HandlebarsIntl = require('handlebars-intl');
var paginateHelper = require('express-handlebars-paginate');

var hbs = expressHbs.create({
	extname			: 'hbs',
	defaultLayout	: 'layout',
	layoutsDir		: __dirname + '/views/layouts/',
	partialsDir		: __dirname + '/views/partials/',
	helpers			: {
		paginate: paginateHelper.createPagination,
		section: function(name, options){
	        if(!this._sections) this._sections = {};
	        this._sections[name] = options.fn(this);
	        return null;
	    },
	}
});
hbs.handlebars.registerHelper('paginateHelper', paginateHelper.createPagination);
Handlebars.registerHelper('isMember', function(role){

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
app.engine('hbs', hbs.engine);
app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//Routes

var authRoute = require('./routes/auth.js')(app,passport);


//load passport strategies

require('./config/passport.js')(passport, models.User);

app.get("/", express.static(path.join(__dirname, "./public")));

app.get('/sync', function(req, res){
	models.sequelize.sync().then(function(){
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











// hbs.registerPartials(__dirname + '/views/partials');
// app.set('view engine', 'hbs');

// app.get('/sync', function(req, res){
// 	models.sequelize.sync().then(function(){
// 		res.send('database sync completed!');
// 	});
// });

// app.get('/', function(req, res){
// 	res.redirect('/articles');
// })
//
// var articles = require('./routes/articles');
// app.use('/articles', articles);
//
// var comments = require('./routes/comments');
// app.use('/comments', comments);


app.post('/payment', (req, res) => {
	var method=req.body.payment_method;
	if(method=='paypal') res.redirect('/paypal');
	else if (method=='vnpay') res.redirect('/vnpay');
	else res.redirect('/');
});

app.get('/templates', (req, res) => {
    res.render('templates.hbs', {
		pageHeader: true,
		cssTemplate: true,
		activeTemplate: true,
		breadcrumbs: [
			{title: "Template", link: "/templates"}
		]
    });
});
app.get('/checkout-step2', (req, res) => {
    res.render('checkout-step2.hbs', {
		pageHeader: false,
		cssCheckOutStep2: true,
		hideBreadcrumb: true
    });
});
app.get('/checkout-step3', (req, res) => {
    res.render('checkout-step3.hbs', {
		payment_method:req.param('payment_method'),
		pageHeader: false,
		cssCheckOutStep3: true,
		cssProductDetail: true,
		cssViewCart: true,
		hideBreadcrumb: true
    });
});



app.listen(app.get('port'), function () {
    console.log('Server is listening at port ' + app.get('port'));
});
