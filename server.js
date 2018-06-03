const express = require('express');
// const hbs = require('hbs');
const models = require('./models');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash    = require('connect-flash');
var session      = require('express-session');

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
	    }
	}
});
hbs.handlebars.registerHelper('paginateHelper', paginateHelper.createPagination);
HandlebarsIntl.registerWith(Handlebars);
app.engine('hbs', hbs.engine);
app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
//Routes

var authRoute = require('./routes/auth.js')(app,passport);


//load passport strategies

require('./config/passport.js')(passport, models.User);

app.get('/sync', function(req, res){
	models.sequelize.sync().then(function(){
		res.send('database sync completed!');
	});
});

var products = require('./routes/products');
app.use('/products', products);
var orders = require('./routes/orders');
app.use('/orders', orders);
var extras = require('./routes/extras');
app.use('/extras', extras);
var paypal = require('./routes/paypal');
app.use('/paypal', paypal);
var cart = require('./routes/view-cart');
app.use('/view-cart', cart);
var vnpay = require('./routes/vnpay');
app.use('/vnpay', vnpay);
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
	var is_member=false;
	var name="";
	if(req.user) name=req.user.last_name;
	if(req.isAuthenticated()) is_member=true;
    res.render('home.hbs', {
		pageHeader: false,
		activeHome: true,
		isMember: is_member,
		name:name,
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
		message: req.flash('loginMessage'),
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
		message: req.flash('registerMessage'),
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

app.get('/admin', (req, res) => {
	res.render('admin/dashboard.hbs', {
		layout: 'admin-layout',
		adminContentHeader: 'Dashboard',
		breadcrumbs: [
			{title: "Dashboard", link: "/admin"}
		]
	})
});

app.get('/admin/categories/new', (req, res) => {
	res.render('admin/categories/new-category.hbs', {
		layout: 'admin-layout',
		adminContentHeader: 'New Category',
		breadcrumbs: [
			{title: "Categories", link: "/admin/categories/list"},
			{title: "New Category", link: "/admin/categories/new"}
		]
	})
});

app.get('/admin/categories/list', (req, res) => {
	res.render('admin/categories/list-categories.hbs', {
		layout: 'admin-layout',
		addNewPage: '/admin/categories/new',
		adminContentHeader: 'All Categories',
		breadcrumbs: [
			{title: "Categories", link: "/admin/categories/list-categories"}
		]
	})
});

app.get('/admin/products/new', (req, res) => {
	res.render('admin/products/new-product.hbs', {
		layout: 'admin-layout',
		adminContentHeader: 'New Product',
		breadcrumbs: [
			{title: "Products", link: "/admin/products/list"},
			{title: "New Product", link: "/admin/products/new"}
		]
	})
});

app.get('/admin/products/list', (req, res) => {
	res.render('admin/products/list-products.hbs', {
		layout: 'admin-layout',
		addNewPage: '/admin/products/new',
		adminContentHeader: 'All Products',
		breadcrumbs: [
			{title: "Products", link: "/admin/products/list-products"}
		]
	})
});

app.get('/admin/orders/new', (req, res) => {
	res.render('admin/orders/new-order.hbs', {
		layout: 'admin-layout',
		adminContentHeader: 'New Order',
		breadcrumbs: [
			{title: "Orders", link: "/admin/orders/list"},
			{title: "New Oder", link: "/admin/orders/new"}
		]
	})
});

app.get('/admin/orders/list', (req, res) => {
	res.render('admin/orders/list-orders.hbs', {
		layout: 'admin-layout',
		addNewPage: '/admin/orders/new',
		adminContentHeader: 'All Orders',
		breadcrumbs: [
			{title: "All Oders", link: "/admin/orders/list"}
		]
	})
});

app.get('/admin/orders/invoice', (req, res) => {
	res.render('admin/orders/invoice.hbs', {
		layout: 'admin-layout',
		adminContentHeader: 'Invoice',
		breadcrumbs: [
			{title: "Orders", link: "/admin/orders"},
			{title: "Invoice", link: "/admin/orders/invoice"}
		]
	})
});

app.get('/admin/users/new', (req, res) => {
	res.render('admin/users/new-user.hbs', {
		layout: 'admin-layout',
		adminContentHeader: 'New User',
		breadcrumbs: [
			{title: "Users", link: "/admin/users/list"},
			{title: "New User", link: "/admin/users/new"}
		]
	})
});

app.get('/admin/users/list', (req, res) => {
	res.render('admin/users/list-users.hbs', {
		layout: 'admin-layout',
		addNewPage: '/admin/users/new',
		adminContentHeader: 'All Users',
		breadcrumbs: [
			{title: "All Users", link: "/admin/users/list"}
		]
	})
});

app.get('/admin/setting', (req, res) => {
	res.render('admin/setting.hbs', {
		layout: 'admin-layout',
		adminContentHeader: 'Setting',
		breadcrumbs: [
			{title: "Setting", link: "/admin/setting"}
		]
	})
});

app.get('/member', (req, res) => {
    res.render('member/dashboard.hbs', {
    pageHeader: false,
		layout: 'admin-layout',
		adminContentHeader: 'Dashboard',
		isMember: true,
    breadcrumbs: [
        {title: "Dashboard", link: "/member"}
    ]
	});
});

app.get('/member/orders', (req, res) => {
    res.render('member/orders.hbs', {
    pageHeader: false,
		layout: 'admin-layout',
		adminContentHeader: 'Booking Orders',
		isMember: true,
    breadcrumbs: [
        {title: "Orders", link: "/member/orders"}
    ]
	});
});

app.get('/member/templates', (req, res) => {
    res.render('member/templates.hbs', {
    pageHeader: false,
		layout: 'admin-layout',
		adminContentHeader: 'Designed Templates',
		isMember: true,
    breadcrumbs: [
        {title: "Templates", link: "/member/templates"}
    ]
	});
});

app.get('/member/setting', (req, res) => {
    res.render('member/setting.hbs', {
    pageHeader: false,
		layout: 'admin-layout',
		adminContentHeader: 'Setting',
		isMember: true,
    breadcrumbs: [
        {title: "Setting", link: "/member/setting"}
    ]
	});
});

app.get('/member/change-password', (req, res) => {
    res.render('member/change-password.hbs', {
    pageHeader: false,
		layout: 'admin-layout',
		adminContentHeader: 'Change Password',
		isMember: true,
    breadcrumbs: [
        {title: "Change Password", link: "/member/change-password"}
    ]
	});
});

app.listen(app.get('port'), function () {
    console.log('Server is listening at port ' + app.get('port'));
});
