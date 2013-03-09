//index

exports.index = function (req, res) {

	res.render('docs/index');

}

exports.errors = function (req, res) {
	var errorCode = req.params.errorid;
	res.render('docs/errors/'+errorCode);
}