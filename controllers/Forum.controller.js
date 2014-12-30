var Promise = require("bluebird");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var Category = mongoose.model("Category");
var Forum = mongoose.model("Forum");

module.exports = function(app) {
	app.get("/:category/:forum", function (req, res) {
		var category = req.params.category;
		var forum = req.params.forum;
		Category.findOne({ slug: category }, function(error, category) {
			Forum.findOne({ 
				category: ObjectId(category._id),
				slug: forum
			}, function(error, forum) {
				res.render("forum", {
					category: category,
					forum: forum
				});
			});
		});
	});
};