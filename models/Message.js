var mongoose = require("mongoose");
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = function(app) {
	mongoose.model("Message", new Schema({
		created: Date,
		edited: Date,
		_editor: ObjectId,
		_topic: ObjectId,
		name: String,
		slug: String,
		body: String,
		_author: ObjectId
	}));
};