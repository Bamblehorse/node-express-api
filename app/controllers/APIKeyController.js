var mongoose = require('mongoose'),
	Model = mongoose.model('APIKey'),
	sha1 = require('sha1'),
	utils = require('../../config/utils.js'),
	sanitize = require('validator').sanitize,
	rate = require('express-rate');

	//RateLimiter = require('limiter').RateLimiter;

var i = 0;

exports.generate = function (req, res) {

	var key = sha1(req.body.email);

	var obj = new Model({
		apikey: key,
		email: req.body.email,
		userAgent: req.headers['user-agent'],
		ip: req.connection.remoteAddress
	});

	obj.save(function(err, docs){
		if (err) { utils.handleErrors(err, res) } else {
			console.log('Inserted:', obj);
			res.writeHead(200);
			res.end(obj.apikey);
		}
	});

}

exports.auth = function(req, res, next) {
	

	var key = req.query.apikey || req.body.apikey;

	console.log(key);

	if (!key) {
		utils.handleErrors({ name: 'Unauthorized' }, res) ;
	} else {
		console.log('api key has been sent', key);
		Model.findOne({ apikey: key }, function(err, docs){
			if (err) { console.log(err); } else if (docs === null) {
				utils.handleErrors({ name: 'Unauthorized' }, res);
			} else {
				next();
			}
		});
	} 
}