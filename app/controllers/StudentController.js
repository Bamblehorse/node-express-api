var mongoose = require('mongoose'),
	utils = require('../../config/utils.js'),
	Model = mongoose.model('Student'),
	Course = mongoose.model('Course'),
	Module = mongoose.model('Module'),
	check = require('validator').check,
	sanitize = require('validator').sanitize;

// index
exports.index = function (req, res) {

	Model.find({}, function(err, docs){
		res.writeHead(200, {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*"
		});
		res.end(utils.prepJSON(docs));
	});
}

// new
exports.new = function(req, res) {
	res.render('students/new');
}

// create
exports.create = function(req, res){
	var obj = new Model();
	obj.name = req.body.name,
	obj.courseid = req.body.courseid,
	obj.username = req.body.username;
	obj.stage = req.body.stage;

	obj.save(function(err, docs){
		if (err) { console.log(err) } else {
			console.log('Inserted:', obj.name);
			res.render('modules/new', {
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
		res.end(Jutils.prepJSON(e));
		return false;
	} 

	Model.find({ _id: req.params.id }, utils.getFields(req.query.fields), function(err, docs){
		if (docs.length === 0) { 
			utils.handleErrors({ name: 'NoContent' }, res) 
		} else {
			res.writeHead(200, 'OK', {
			"Content-Type": "application/json"
			});
			res.end(utils.prepJSON(docs));
		}
	}); 
}

// edit
exports.edit = function (req, res) {
	res.render('students/edit');
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
		res.end(JSON.stringify(e));
		return false;
	} 

	Model.update({ _id: req.params.id }, {
		name: req.body.name,
		courseid: req.body.courseid,
		username: req.body.username,
		stage: req.body.stage
	}, function(err, docs){
		if (err) { 
			console.log(err);
			utils.handleErrors(err, res);
		} else if (docs.length === 0){
			utils.handleErrors({ name: 'NoContent' }, res);
		} else {
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

exports.courses = function (req, res){
	console.log('finding courses for: ', req.params.id);
	Model.findById(req.params.id, function(err, doc){
		//console.log(doc);
		var courseid = doc.courseid;
		Course.findById(courseid, function(err, docs){
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
	});
}

exports.modules = function (req, res){
	console.log('finding modules for: ', req.params.id);
	Model.findById(req.params.id, function(err, doc){
		//console.log(doc.stage, doc.courseid);
		var courseid = doc.courseid,
			stage = doc.stage;
		Module.find({ courses:courseid, stage: stage }, function(err, docs){
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
	})
}