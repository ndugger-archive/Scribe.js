var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

module.exports = function(app) {
	var Author = new Schema({
		created: Date,
		name: String,
		password: String,
		email: String,
	});
};