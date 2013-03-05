var mongoose = require('mongoose'),
	utils = require('../../config/utils.js'),
	check = require('validator').check,
	sanitize = require('validator').sanitize;
	Model = mongoose.model('Module');

// index
exports.index = function (req, res) {

	Model.find({}, function(err, docs){
		if (docs.length === 0) { 
			utils.handleErrors({ name: 'NoContent' }, res) 
		} else {
			res.writeHead(200, {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			});
			res.end(JSON.stringify(docs));
		}
	});
}

// new
exports.new = function(req, res) {
	res.render('modules/new');
}

// create
exports.create = function(req, res){
	var obj = new Model();
	obj.name = req.body.name,
	obj.code = req.body.code,
	obj.stage = req.body.stage;

	var s = req.body.courses;
		obj.courses = s.split(',');

	console.log('obj is ', obj);
	
	obj.save(function(err, docs){
		if (err) { console.log(err) } else {
			console.log('Inserted:', obj.name);
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
		res.end(JSON.stringify(e));
		return false;
	}
	
	Model.findById(req.params.id, function(err, docs){
		if (err) { 
			utils.handleErrors(err, res);
		} else if (!docs || docs.length === 0) { 
			utils.handleErrors({ name: 'NoContent' }, res) 
		} else {
			res.writeHead(200, 'OK', {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*"
			});
			res.end(JSON.stringify(docs));
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
		res.end(JSON.stringify(e));
		return false;
	}
	
	Model.findById(req.params.id, function(err, docs){
		if (err) { 
			utils.handleErrors(err, res);
			return false;
		} else if (!docs || docs.length === 0) { 
			utils.handleErrors({ name: 'NoContent' }, res) 
		} else {
			res.render('modules/edit', {
				id: docs._id,
				name: docs.name,
				code: docs.code,
				courses: docs.courses,
				stage: docs.stage
			});
		}
	});
}
// update
exports.update = function (req, res) {

}
// destroy
exports.destroy = function (req, res) {

}
