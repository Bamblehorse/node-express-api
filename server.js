var express = require('express'),
	http = require('http'),
	mongoose = require('mongoose'),
	fs = require('fs'),
	hbs = require('hbs');
  //passport = require('passport');

// init app
var app = express();

// dat configuration
app.configure(function(){

    app.set('title', 'SOFT338');
    app.set('views', __dirname + '/app/views');
    app.use(express.bodyParser());
    app.set('view engine', 'html');
    app.engine('html', require('hbs').__express);

    app.use('/images', express.static(__dirname + '/public/images'));
    app.use('/css', express.static(__dirname + '/public/css'));
    app.use('/js', express.static(__dirname + '/public/js'));
    app.use('/fonts', express.static(__dirname + '/public/fonts'));
    app.use('/demo', express.static(__dirname + '/demo/'));

    console.log('views: ', app.get('views'));

});

// require models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
})

// register partial views
require('./config/registerPartials.js')(app, express);

// dat route
require('./config/routes.js')(app, express);


var uristring = 
  process.env.MONGODB_URI || 
  process.env.MONGOLAB_URI || 
  'mongodb://localhost/SOFT338';
/*
// Ensure safe writes
var mongoOptions = { user: "heroku_app11371005", account: "heroku_app11371005" ,db: { safe: true }};
*/
// Connect
mongoose.connect(uristring, {}, function (err, db) {
  if (err) {
    console.log('mongoose error');
  } else {
    console.log('Success connecting to database');
  }
});

// start connection to database
//mongoose.connect('mongodb://localhost/SOFT338');

//start application
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

console.log('Application started..');