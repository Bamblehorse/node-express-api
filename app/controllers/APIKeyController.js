var mongoose = require('mongoose'),
	Model = mongoose.model('APIKey'),
	sha1 = require('sha1'),
	utils = require('../../config/utils.js'),
	sanitize = require('validator').sanitize;
	//RateLimiter = require('limiter').RateLimiter;

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

	/* function rateLimiter() {
		limiter.removeTokens(1, function(err, remainingRequests){
			if (err || remainingRequests === 0) {
				console.log('Error: ', err, remainingRequests);
				utils.handleErrors({ name: 'TooManyRequests' }, res);
			} else {
				console.log(remainingRequests);
				next();
			}
		}); 
	} */

	/* if (!req.query.apikey) {
		utils.handleErrors({ name: 'Unauthorized' }, res) ;
	} else {
		console.log('api key has been sent', req.query.apikey);
		Model.findOne({ apikey: req.query.apikey }, function(err, docs){
			if (err) { console.log(err); } else if (docs === null) {
				utils.handleErrors({ name: 'Unauthorized' }, res);
			} else {
				next(docs);
			}
		});
	} */

	next();
}

exports.limit = function (req, res, next){
	console.log('next is', next);
}