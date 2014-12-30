var Promise = require("bluebird");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var Category = mongoose.model("Category");
var Forum = mongoose.model("Forum");

module.exports = function(app) {
	app.get("/:category", function (req, res) {
		var category = req.params.category;
		Category.findOne({ slug: category }, function(error, category) {
			var getForums = new Promise(function(resolve, reject) {
				Forum.find({ 
					category: ObjectId(category._id) 
				}, function(error, forums) {
					category.forums = forums;
					resolve();
				});
			});
			getForums.then(function() {
				res.render("category", {
					category: category
				});
			});
		});
	});
};