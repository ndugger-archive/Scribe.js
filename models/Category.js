var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

module.exports = function(app) {
	mongoose.model("Category", new Schema({
		order: Number,
		name: String,
		slug: String
	}));
};