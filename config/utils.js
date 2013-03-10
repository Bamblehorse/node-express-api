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
			err.message = 'Rate limit exausted for your API key.';
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

exports.getFields = function (query) {

	console.log('getFields');
	
	function objEmpty(obj) {
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
		var fields = { __v: 0 }
		return fields;
	}
}

exports.prepJSON = function (data){
	return JSON.stringify(data);
}

exports.getQueryParams = function (req){
	function objEmpty(obj) {
		//console.log('obj is', obj);
		return (Object.getOwnPropertyNames(obj).length === 0);
	}
	
	if (!objEmpty(req.query)) {
		console.log(req.query);
	} else {
		return false;
	}
}