const express = require('express');
// const hbs = require('hbs');
const models = require('./models');
var bodyParser = require('body-parser');
var app = express();


var expressHbs = require('express-handlebars');
var paginateHelper = require('express-handlebars-paginate');
var hbs = expressHbs.create({
	extname			: 'hbs',
	// defaultLayout	: 'layout',
	layoutsDir		: __dirname + '/views/layouts/',
	partialsDir		: __dirname + '/views/partials/',
	helpers			: {
		paginate: paginateHelper.createPagination
	}
});
hbs.handlebars.registerHelper('paginateHelper', paginateHelper.createPagination);
app.engine('hbs', hbs.engine);
app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// hbs.registerPartials(__dirname + '/views/partials');
// app.set('view engine', 'hbs');

app.get('/sync', function(req, res){
	models.sequelize.sync().then(function(){
		res.send('database sync completed!');
	});
});

app.get('/', function(req, res){
	res.redirect('/articles');
})

var articles = require('./routes/articles');
app.use('/articles', articles);

var comments = require('./routes/comments');
app.use('/comments', comments);


// app.get('/articles/:id', (req, res) => {
//     res.render('detail.hbs', {
//         pageTitle: "Article Title"
//     });
// });

app.listen(app.get('port'), function () {
    console.log('Server is listening at port ' + app.get('port'));
});
