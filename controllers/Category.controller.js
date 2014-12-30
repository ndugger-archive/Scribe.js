var Promise = require("bluebird");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var Category = mongoose.model("Category");
var Forum = mongoose.model("Forum");

module.exports = function(app) {
	app.get("/:category", function (req, res) {
		var category = req.params.category;
		// Find the Category
		Category.findOne({ 
			slug: category 
		}, function(error, category) {
			// Find the Forums
			Forum.find({ 
				_category: ObjectId(category._id) 
			}, function(error, forums) {
				// TODO: Find each forum's latest post
				category.forums = forums;
				res.render("category", {
					category: category
				});
			});
		});
	});
};