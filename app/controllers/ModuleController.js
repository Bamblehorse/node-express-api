var mongoose = require('mongoose'),
	Model = mongoose.model('Module');

// index
exports.index = function (req, res) {

	Model.find({}, function(err, docs){
		res.writeHead(200, {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*"
		});
		res.end(JSON.stringify(docs));
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
	obj.code = req.body.code;

	obj.save(function(err, docs){
		if (err) { console.log(err) } else {
			console.log('Inserted:', obj.name);
		}
	});

}

// show
exports.show = function (req, res) {

}

// edit
exports.edit = function (req, res) {
	res.render('courses/edit');
}
// update
exports.update = function (req, res) {

}
// destroy
exports.destroy = function (req, res) {

}
