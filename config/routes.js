// routes.js
var application = require('../app/controllers/ApplicationController'),
	courses = require('../app/controllers/CourseController'),
	modules = require('../app/controllers/ModuleController'),
	students = require('../app/controllers/StudentController'),
	apikey = require('../app/controllers/APIKeyController');
	//passport = require('passport'),
	//TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function (app, express) {

	app.get('/', function(req, res){
		res.redirect('/v1/docs/')
	});

	app.get('/v1/', function(req, res){
		res.redirect('/v1/docs/')
	});

	app.get('/v1/docs/', application.index);

	//app.get('/v1/', apikey.auth);

	// courses
	app.get('/v1/courses/', apikey.auth, courses.index);
	app.get('/v1/courses/new', apikey.auth, courses.new);
	app.post('/v1/courses/', courses.create);
	app.get('/v1/courses/:id', apikey.auth, courses.show);
	app.get('/v1/courses/:id/edit', apikey.auth, courses.edit);
	app.put('/v1/courses/:id', courses.update);
	app.delete('/v1/courses/:id', courses.destroy);
	app.get('/v1/courses/:id/modules', apikey.auth, courses.modules);
	app.get('/v1/courses/:id/students', apikey.auth, courses.students);

	// modules
	app.get('/v1/modules/', modules.index);
	app.get('/v1/modules/new', modules.new);
	app.post('/v1/modules/', modules.create);
	app.get('/v1/modules/:id', modules.show);
	app.get('/v1/modules/:id/edit', modules.edit);
	app.put('/v1/modules/:id', modules.update);
	app.delete('/v1/modules/:id', modules.destroy);
	//app.get('/courses/:id/students', courses.getstudents);

	// students
	app.get('/v1/students/', students.index);
	app.get('/v1/students/new', students.new);
	app.post('/v1/students/', students.create);
	app.get('/v1/students/:id', students.show);
	app.get('/v1/students/:id/edit', students.edit);
	app.put('/v1/students/:id', students.update);
	app.delete('/v1/students/:id', students.destroy);
	app.get('/v1/students/:id/courses', students.courses);
	app.get('/v1/students/:id/modules', students.modules);

	// oauth
	/* app.get('/v1/auth/twitter', passport.authenticate('twitter'));
	app.get('/v1/auth/twitter/callback', passport.authenticate('twitter', {
		successRedirect: '/',
		failureRedirect: '/ohshit'
	})); 

	passport.use(new TwitterStrategy({
		consumerKey: 'wkhCK0xQvZ8Jo1h8CjODzQ',
		consumerSecret: 'pgSAtvXj45wKLKRIseLj5tAYD6o3ryAw6WQwwuWpg',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	function(token, tokenSecret, profile, done){
		//console.log('Auth: ', token, tokenSecret, profile);
		var user = {};
		user.username = profile.username;
		user.displayName = profile.displayName;
		console.log('user is: ', user);
		done(null, JSON.stringify(user));
	}));
	*/

	app.post('/v1/apikey', apikey.generate);
	app.get('/v1/apikey', function(req, res){
		res.redirect('/')
	});

	//docs
	app.get('/v1/docs/errors/:errorid', application.errors);

}