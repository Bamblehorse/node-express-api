// routes.js
var application = require('../app/controllers/ApplicationController'),
	courses = require('../app/controllers/CourseController'),
	modules = require('../app/controllers/ModuleController'),
	students = require('../app/controllers/StudentController'),
	apikey = require('../app/controllers/APIKeyController'),
	utils = require('../config/utils.js');
	//passport = require('passport'),
	//TwitterStrategy = require('passport-twitter').Strategy;

	var rate = require('express-rate');

module.exports = function (app, express) {

	var limit = rate.middleware({ limit: 100, interval: 3600, 
		onLimitReached: function(req, res, rate, limit, resetTime, next){
			utils.handleErrors({ name: 'TooManyRequests' }, res);
		}
	});

	app.get('/', function(req, res){
		res.redirect('/v1/docs/')
	});

	app.get('/v1/', function(req, res){
		res.redirect('/v1/docs/')
	});

	app.get('/v1/docs/', application.index);

	//app.get('/v1/', apikey.auth);

	// courses
	app.get('/v1/courses/', apikey.auth, limit, courses.index);
	app.get('/v1/courses/new', apikey.auth, limit, courses.new);
	app.post('/v1/courses/', apikey.auth, limit, courses.create);
	app.get('/v1/courses/:id', apikey.auth, limit, courses.show);
	app.get('/v1/courses/:id/edit', apikey.auth, limit, courses.edit);
	app.put('/v1/courses/:id', apikey.auth, limit, courses.update);
	app.delete('/v1/courses/:id', apikey.auth, limit, courses.destroy);
	app.get('/v1/courses/:id/modules', apikey.auth, limit, courses.modules);
	app.get('/v1/courses/:id/students', apikey.auth, limit, courses.students);

	// modules
	app.get('/v1/modules/', apikey.auth, limit, modules.index);
	app.get('/v1/modules/new', apikey.auth, limit, modules.new);
	app.post('/v1/modules/', apikey.auth, limit, modules.create);
	app.get('/v1/modules/:id', apikey.auth, limit, modules.show);
	app.get('/v1/modules/:id/edit', apikey.auth, limit, modules.edit);
	app.put('/v1/modules/:id', apikey.auth, limit, modules.update);
	app.delete('/v1/modules/:id', apikey.auth, limit, modules.destroy);
	app.get('/v1/modules/:id/courses', apikey.auth, limit, modules.courses);
	app.get('/v1/modules/:id/students', apikey.auth, limit, modules.students);

	// students
	app.get('/v1/students/', apikey.auth, limit, students.index);
	app.get('/v1/students/new', apikey.auth, limit, students.new);
	app.post('/v1/students/', apikey.auth, limit, students.create);
	app.get('/v1/students/:id', apikey.auth, limit, students.show);
	app.get('/v1/students/:id/edit', apikey.auth, limit, students.edit);
	app.put('/v1/students/:id', apikey.auth, limit, students.update);
	app.delete('/v1/students/:id', apikey.auth, limit, students.destroy);
	app.get('/v1/students/:id/courses', apikey.auth, limit, students.courses);
	app.get('/v1/students/:id/modules', apikey.auth, limit, students.modules);

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