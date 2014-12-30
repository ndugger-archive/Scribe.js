var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

module.exports = function(app) {
	var Message = new Schema({
		created: Date,
		edited: Date,
		editor: Number,
		topic: Number,
		name: String,
		slug: String,
		body: String,
		author: Number
	});
};