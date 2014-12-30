var mongoose = require("mongoose");
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = function(app) {
	mongoose.model("Author", new Schema({
		created: Date,
		name: String,
		password: String,
		email: String,
		posts: Number,
		_group: ObjectId
	}));
};