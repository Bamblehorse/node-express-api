var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var APIKeySchema = new Schema({
    id: ObjectId,
    apikey: { type: String, required: true },
    requests: { type: Number, required: true, default: 0 },
    requestsIssued: { type: Date },
    email: { type: String, required: true },
    userAgent: { type: String },
    ip: { type: String }
});

mongoose.model('APIKey', APIKeySchema);