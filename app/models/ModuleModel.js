var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ModuleSchema = new Schema({
    id: ObjectId,
    name: { type: String, required: true },
    code: { type: String, required: true }
});

mongoose.model('Module', ModuleSchema);