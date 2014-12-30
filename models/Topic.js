var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

module.exports = function(app) {
	var Topic = new Schema({
		created: Date,
		modified: Date,
		forum: Number,
		name: String,
		slug: String,
		first: Number,
		latest: Number,
		messages: Number,
		views: Number,
		sticky: Boolean,
		locked: Boolean
	});
};