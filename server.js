const express = require('express');
// const hbs = require('hbs');
const models = require('./models');
var bodyParser = require('body-parser');
var app = express();


var expressHbs = require('express-handlebars');
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
	    }
	}
});
helpers: {

}
hbs.handlebars.registerHelper('paginateHelper', paginateHelper.createPagination);
app.engine('hbs', hbs.engine);
app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

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


app.get('/', (req, res) => {
    res.render('home.hbs', {
		pageHeader: true,
		activeHome: true,
		breadcrumbs: [
			{title: "Home", link: "/"}
		]
    });
});

app.get('/contact', (req, res) => {
    res.render('contact.hbs', {
		pageHeader: false,
		cssContact: true,
		activeContact: true,
		breadcrumbs: [
			{title: "Contact", link: "/contact"}
		]
    });
});

app.get('/about-us', (req, res) => {
    res.render('about-us.hbs', {
		pageHeader: false,
		cssAboutUs: true,
		activeAboutUs: true,
		breadcrumbs: [
			{title: "About Us", link: "/about-us"}
		]
    });
});

app.get('/personal-products', (req, res) => {
    res.render('personal-products.hbs', {
		pageHeader: false,
		cssPersonalProducts: true,
		activeAboutUs: true,
		breadcrumbs: [
			{title: "My Products", link: "/personal-products"}
		]
    });
});

app.get('/shop', (req, res) => {
    res.render('shop.hbs', {
		pageHeader: true,
		cssShop: true,
		activeShop: true,
		breadcrumbs: [
			{title: "Shop", link: "/shop"}
		]
    });
});

app.get('/view-cart', (req, res) => {
    res.render('view-cart.hbs', {
		pageHeader: true,
		activeHome: true,
		cssViewCart: true,
		breadcrumbs: [
			{title: "View Cart", link: "/view-cart"}
		]
    });
});

app.get('/product-detail', (req, res) => {
    res.render('product-detail.hbs', {
		pageHeader: true,
		cssProductDetail: true,
		breadcrumbs: [
			{title: "Men", link: "#"},
			{title: "Long Shirt", link: "#"},
			{title: "White T-shirt", link: "#"}
		] //This should change to product name later
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
		pageHeader: false,
		cssCheckOutStep3: true,
		cssProductDetail: true,
		cssViewCart: true,
		hideBreadcrumb: true
    });
});

app.get('/login', (req, res) => {
    res.render('auth/login.hbs', {
		pageHeader: false,
		activeLogin: true,
		cssLogin: true,
		hideBreadcrumb: true,
		breadcrumbs:[
			{title: "Login", link: "/login"}
		]
    });
});

app.get('/register', (req, res) => {
    res.render('auth/register.hbs', {
		pageHeader: false,
		activeRegister: true,
		cssRegister: true,
		// hideBreadcrumb: true,
		breadcrumbs:[
			{title: "Register", link: "/register"}
		]
    });
});

app.get('/design', (req, res) => {
    res.render('design.hbs', {
		pageHeader: true,
		activeDesign: true,
		breadcrumbs: [
			{title: "Design", link: "/design"}
		]
    });
});


app.listen(app.get('port'), function () {
    console.log('Server is listening at port ' + app.get('port'));
});
