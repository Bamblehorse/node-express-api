var mongoose = require('mongoose'),
	validate = require('mongoose-validator').validate,
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var nameValidator = validate('len', 5, 100),
	courseidValidator = validate('len', 24, 24),
	usernameValidator = validate('len', 3, 40),
	stageValidator = validate('len', 1, 2);

var UserSchema = new Schema({
    id: ObjectId,
    name: { type: String, required: true, validate: nameValidator },
    courseid: { type: String, required: true, validate: courseidValidator },
    username: { type: String, required: true, validate: usernameValidator },
    stage: { type: Number, required: true, default: 1, validate: stageValidator }
});

mongoose.model('User', UserSchema);