var mongoose = require('mongoose'),
	validate = require('mongoose-validator').validate,
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var nameValidator = validate('len', 5, 100),
	codeValidator = validate('len', 4, 10),
	facultyValidator = validate('len', 5, 100),
	schoolValidator = validate('len', 5, 100),
	levelValidator = validate('len', 5, 100);

var CourseSchema = new Schema({
    id: ObjectId,
    name: { type: String, required: true, validate: nameValidator },
    code: { type: Number, required: true, validate: codeValidator, unique: true },
    faculty: { type: String, required: true, validate: facultyValidator },
    school: { type: String, required: true, validate: schoolValidator },
    level: { type: String, required: true, validate: levelValidator }
});

mongoose.model('Course', CourseSchema);