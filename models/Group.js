var mongoose = require("mongoose");
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = function(app) {
	mongoose.model("Group", new Schema({
		name: String,
		slug: String,
		description: String,
		_leader: ObjectId
	}));
};