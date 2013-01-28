var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CourseSchema = new Schema({
    id: ObjectId,
    name: { type: String, required: true },
    code: { type: Number, required: true },
    faculty: { type: String, required: true },
    school: { type: String, required: true },
    level: { type: String, required: true }
});

mongoose.model('Course', CourseSchema);