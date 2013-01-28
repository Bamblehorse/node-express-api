// routes.js

module.exports = function (app, express) {

	var courses = require('../app/controllers/CourseController'),
		modules = require('../app/controllers/ModuleController');

	// courses
	app.get('/courses/', courses.index);
	app.get('/courses/new', courses.new);
	app.post('/courses/', courses.create);
	app.get('/courses/:id', courses.show);
	app.get('/courses/:id/edit', courses.edit);
	app.put('/courses/:id', courses.update);
	app.delete('/courses/:id', courses.destroy);
	//app.get('/courses/:id/users', courses.getUsers);

	// modules
	app.get('/modules/', modules.index);
	app.get('/modules/new', modules.new);
	app.post('/modules/', modules.create);
	app.get('/modules/:id', modules.show);
	app.get('/modules/:id/edit', modules.edit);
	app.put('/modules/:id', modules.update);
	app.delete('/modules/:id', modules.destroy);
	//app.get('/courses/:id/users', courses.getUsers);

}