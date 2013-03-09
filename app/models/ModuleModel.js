var mongoose = require('mongoose'),
	validate = require('mongoose-validator').validate,
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var nameValidator = validate('len', 5, 100),
	codeValidator = validate('len', 4, 10),
	coursesValidator = validate('len', 5, 100),
	stageValidator = validate('len', 1, 2);

var ModuleSchema = new Schema({
    id: ObjectId,
    name: { type: String, required: true, validate: nameValidator },
    code: { type: String, required: true, unique: true, validate: codeValidator },
    courses: { type: Array, required: true, validate: coursesValidator },
    stage: { type: Number, required: true, validate: stageValidator }
});

mongoose.model('Module', ModuleSchema);