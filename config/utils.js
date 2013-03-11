exports.handleErrors = function(err, res){
	//console.log('handling errors..');

	var errorUrl = 'http://soft338.heroku.com/v1/docs/errors/';
	console.log('Error is: ', err);

	switch (err.name) {
		//mongoose error
		case 'ValidationError':
			err.code = 400;
			err.more_info = errorUrl+err.code;
			err.errors = JSON.stringify(err.errors);
			console.log(err);
			res.writeHead(err.code, err, {
				"Content-Type": "text/html"
			});
			res.end(JSON.stringify(err));
		break;

		//mongodb casting error
		case 'CastError':
			err.code = 400;
			err.more_info = errorUrl+err.code;

			console.log(err);
			res.writeHead(err.code, err, {
				"Content-Type": "text/html"
			});
			res.end(JSON.stringify(err));
		break;

		case 'MongoError':
			var ss = err.err.substring(0,6);
			delete err.message;
			
			if (ss === 'E11000') {
				err.message = 'MongoDB Duplicate Key Error';
				err.code = 400;
				err.more_info = errorUrl+err.code;
				delete err.err;
				res.writeHead(err.code, err, {
					"Content-Type": "text/html"
				});
				res.end(JSON.stringify(err));
			} else {
				err.message = 'Internal Server Error';
				err.code = 500;
				err.more_info = errorUrl+err.code;
				delete err.err;
				res.writeHead(err.code, err, {
					"Content-Type": "text/html"
				});
				res.end(JSON.stringify(err));
			}
		
		break;

		case 'NoContent':
			err.message = 'Lookup was successful however it did not return any data.';
			err.code = 204;
			err.more_info = errorUrl+err.code;
			console.log(err);
			res.writeHead(err.code, err, {
				"Content-Type": "text/html"
			});
			res.end(JSON.stringify(err));
		break;

		case 'Unauthorized':
			err.message = 'Authentication is required, please check your API Key is correct.';
			err.code = 401;
			err.more_info = errorUrl+err.code;
			console.log(err);
			res.writeHead(err.code, err, {
				"Content-Type": "text/html"
			});
			res.end(JSON.stringify(err));
		break;

		case 'TooManyRequests':
			err.message = 'Rate limit exausted. Chill out.';
			err.code = 429;
			err.more_info = errorUrl+err.code;
			console.log(err);
			res.writeHead(err.code, err, {
				"Content-Type": "text/html"
			});
			res.end(JSON.stringify(err));
		break;
	}

}

exports.getFields = function (fields) {

	if (!fields) {
		var fields = { __v: 0 }
		return fields;	
	} else {
		var s = fields.split(','),
			fields = {}; //default 
		for (var i = 0; i < s.length; i++) {
			var key = s[i];
			fields[key] = 1;
		}
		return fields;
	}
	
	/* function objEmpty(obj) {
		//console.log('obj is', obj);
		return (Object.getOwnPropertyNames(obj).length === 0);
	}

	if (!objEmpty(query)) {
		if (query.fields) {
			console.log('fields exist');
			var s = query.fields.split(','),
			fields = {}; //default 
			for (var i = 0; i < s.length; i++) {
				var key = s[i];
				fields[key] = 1;
			}
			return fields;
		} else {
			console.log('no fields supplied');
		}
	} else {
		
	} */
}

exports.prepJSON = function (data){
	return JSON.stringify(data, undefined, 2);
}

exports.getPagination = function (offset, limit) {
	var obj = {};
	obj.skip = offset || 0;
	obj.limit = limit || 20;
	return obj;
}