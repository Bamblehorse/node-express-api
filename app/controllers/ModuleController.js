var mongoose = require('mongoose'),
	utils = require('../../config/utils.js'),
	check = require('validator').check,
	sanitize = require('validator').sanitize;
	Model = mongoose.model('Module'),
	Student = mongoose.model('Student'),
	Course = mongoose.model('Course');

// index
exports.index = function (req, res) {

	Model.find({}, utils.getFields(req.query.fields), utils.getPagination(req.query.offset, req.query.limit), function(err, docs){
		if (docs.length === 0) { 
			utils.handleErrors({ name: 'NoContent' }, res) 
		} else {
			res.writeHead(200, {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			});
			res.end(utils.prepJSON(docs));
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
		res.end(utils.prepJSON(e));
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
		stage: req.body.stage,
		courses: req.body.courses
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

exports.students = function (req, res) {
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

	var moduleid = req.params.id;

	Model.findById(moduleid, function(err, doc){
		var courses = doc.courses,
			stage = doc.stage;
		Student.find({courseid:{$in:courses}, stage:stage }, function(err, docs){
			if (err) { 
				console.log(err);
				utils.handleErrors(err, res);
			} else if (docs.length === 0){
				utils.handleErrors({ name: 'NoContent' }, res);
			} else {
				res.writeHead(200, 'OK', {
					"Content-Type": "application/json"
				});
				res.end(utils.prepJSON(docs));
			}
		});
	});
}

exports.courses = function (req, res) {
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

	var moduleid = req.params.id;

	Model.findById(moduleid, function(err, doc){
		var courses = doc.courses,
			stage = doc.stage;

		console.log('courses', courses);

		Course.find({_id:{$in:courses}}, function(err, docs){
			if (err) { 
				console.log(err);
				utils.handleErrors(err, res);
			} else if (docs.length === 0){
				utils.handleErrors({ name: 'NoContent' }, res);
			} else {
				res.writeHead(200, 'OK', {
					"Content-Type": "application/json"
				});
				res.end(utils.prepJSON(docs));
			}
		});
	});
}
