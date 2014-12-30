var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = function(app) {
	mongoose.model("Topic", new Schema({
		created: Date,
		modified: Date,
		_forum: ObjectId,
		name: String,
		slug: String,
		_author: ObjectId,
		_latest: ObjectId,
		messages: Number,
		views: Number,
		sticky: Boolean,
		locked: Boolean
	});
};