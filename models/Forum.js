var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = function(app) {
	mongoose.model("Forum", new Schema({
		category: ObjectId,
		order: Number,
		parent: ObjectId,
		name: String,
		slug: String,
		description: String,
		topics: Number,
		messages: Number,
		latest: ObjectId
	}));
};