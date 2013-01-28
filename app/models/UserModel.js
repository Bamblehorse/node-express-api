var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    id: ObjectId,
    name: { type: String, required: true },
    courseid: { type: String, required: true },
    username: { type: String, required: true }
});

mongoose.model('User', UserSchema);