var mongoose = require('mongoose'),
	utils = require('../../config/utils.js'),
	apikey = require('../controllers/APIKeyController.js'),
	Model = mongoose.model('Course'),
	Module = mongoose.model('Module'),
	User = mongoose.model('User'),
	passport = require('passport'),
	check = require('validator').check,
	sanitize = require('validator').sanitize;

// index
exports.index = function (req, res) {

	//passport.authenticate('token', {session: false});

	//utils.getQueryParams(req);

	Model.find({}, utils.getFields(req.query), function(err, docs){

		if (docs.length === 0) { 
			utils.handleErrors({ name: 'NoContent' }, res) 
		} else {
			res.writeHead(200, 'Successful', {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			});

			res.end(utils.prepJSON(docs));
		}
	});
}

// new
exports.new = function(req, res) {
	res.render('courses/new');
}

// create
exports.create = function(req, res){
	var obj = new Model();
	obj.name = req.body.name,
	obj.code = req.body.code,
	obj.faculty = req.body.faculty,
	obj.school = req.body.school,
	obj.level = req.body.level;

	obj.save(function(err, docs){
		if (err) { utils.handleErrors(err, res) } else {
			console.log('Inserted:', obj.name);
			res.render('courses/new', {
				locals: {
					message: 'Successfully created!'
				}
			});
		}
	});
}

// show
exports.show = function (req, res) {

	try {
		check(req.params.id, 'Please enter a valid ID').len(24);
	} catch (e) {
		console.log(e);
		res.writeHead(200, 'OK', {
			"Content-Type": "application/json"
		});
		res.end(utils.prepJSON(e));
		return false;
	} 

	Model.find({ _id: req.params.id }, utils.getFields(req.query), function(err, docs){
		if (docs.length === 0) { 
			utils.handleErrors({ name: 'NoContent' }, res) 
		} else {
			res.writeHead(200, 'OK', {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*"
			});
			res.end(utils.prepJSON(docs));
		}
	}); 

}

// edit
exports.edit = function (req, res) {

	try {
		check(req.params.id, 'Please enter a valid ID').len(24);
	} catch (e) {
		console.log(e);
		res.writeHead(200, 'OK', {
			"Content-Type": "application/json"
		});
		res.end(utils.prepJSON(e));
		return false;
	}

	Model.find({ _id: req.params.id }, function(err, docs){
		res.render('courses/edit', {
			id: docs[0]._id,
			name: docs[0].name,
			code: docs[0].code,
			faculty: docs[0].faculty,
			school: docs[0].school,
			level: docs[0].level
		});
	});
}

// update
exports.update = function (req, res) {

	console.log('updating');

	try {
		check(req.params.id, 'Please enter a valid ID').len(24);
	} catch (e) {
		console.log(e);
		res.writeHead(200, 'OK', {
			"Content-Type": "application/json"
		});
		res.end(utils.prepJSON(e));
		return false;
	} 

	Model.update({ _id: req.params.id }, {
		name: req.body.name,
		code: req.body.code,
		faculty: req.body.faculty,
		school: req.body.school,
		level: req.body.level
	}, function(err, docs){
		if (err) { 
			console.log(err);
			utils.handleErrors(err, res);
		} else if (docs.length === 0){
			utils.handleErrors({ name: 'NoContent' }, res);
		} else {
			console.log('updated!');
			res.writeHead(200, 'OK', {
				"Content-Type": "text/html",
				"Access-Control-Allow-Origin": "*"
			});
			res.end('Updated Successfully');
		}
	}); 
}

// destroy
exports.destroy = function (req, res) {
	//console.log('deleting record: ', req.params.id);
	Model.findById(req.params.id, function(err, doc){
		doc.remove(function(err){
			if (err) {
				console.log(err);
			} else {
				console.log('removed: ', req.params.id);
				res.writeHead(200, 'OK', {
					"Content-Type": "text/html"
				});
				res.end('Deleted Successfully');
			}
		});
	});
}

// modules with courseid
exports.modules = function (req, res) {
	try {
		check(req.params.id, 'Please enter a valid ID').len(24);
	} catch (e) {
		console.log(e);
		console.log('id is '+req.params.id.length);
		res.writeHead(200, 'OK', {
			"Content-Type": "application/json"
		});
		res.end(utils.prepJSON(e));
		return false;
	} 

	var courseid = req.params.id;

	Module.find({ courses:courseid }, utils.getFields(req.query), function(err, docs){
		if (err) { 
			console.log(err);
			utils.handleErrors(err, res);
		} else if (docs.length === 0){
			utils.handleErrors({ name: 'NoContent' }, res);
		} else {
			console.log(docs);
			res.writeHead(200, 'OK', {
				"Content-Type": "application/json"
			});
			res.end(utils.prepJSON(docs));
		}
	});
}

// users with courseid
exports.users = function (req, res) {
	try {
		check(req.params.id, 'Please enter a valid ID').len(24);
	} catch (e) {
		console.log(e);
		console.log('id is '+req.params.id.length);
		res.writeHead(200, 'OK', {
			"Content-Type": "application/json"
		});
		res.end(utils.prepJSON(e));
		return false;
	} 

	var courseid = req.params.id;

	User.find({ courseid:courseid }, utils.getFields(req.query), function(err, docs){
		if (err) { 
			console.log(err);
			utils.handleErrors(err, res);
		} else if (docs.length === 0){
			utils.handleErrors({ name: 'NoContent' }, res);
		} else {
			console.log(docs);
			res.writeHead(200, 'OK', {
				"Content-Type": "application/json"
			});
			res.end(utils.prepJSON(docs));
		}
	});
}