exports.handleErrors = function(err, res){
	//console.log('handling errors..');

	var errorUrl = 'http://soft338.heroku.com/v1/docs/errors/';
	console.log('Error is: ', err);

	switch (err.name) {
		//mongoose error
		case 'ValidationError':
			err.code = 400;
			err.more_info = errorUrl+err.code;
			console.log(err);
			res.writeHead(err.code, err, {
				"Content-Type": "text/html"
			});
			res.end(err);
		break;

		//mongoose error
		case 'CastError':
			err.message = 'Internal Server Error';
			if (err.value.length != 24) {
				err.message = "Invalid ID"
			}
			err.code = 500;
			err.more_info = errorUrl+err.code;

			// surpress internal error data for security, 
			// developers don't need this information.
			delete err.type;
			delete err.path;

			console.log(err);
			res.writeHead(err.code, err, {
				"Content-Type": "text/html"
			});
			res.end(err);
		break;

		case 'NoContent':
			err.message = 'Lookup was successful however it did not return any data.';
			err.code = 204;
			err.more_info = errorUrl+err.code;
			console.log(err);
			res.writeHead(err.code, err, {
				"Content-Type": "text/html"
			});
			res.end(err);
		break;
	}

}

exports.objEmpty = function (obj) {
	 return (Object.getOwnPropertyNames(obj).length === 0);
}