var Promise = require("bluebird");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var Category = mongoose.model("Category");
var Forum = mongoose.model("Forum");

module.exports = function(app) {
	app.get("/", function (req, res) {
		Category.find({}, function (error, categories) {
			if (!categories.length) {
				var category = new Category({
					order: 0,
					name: "Scribe",
					slug: "scribe"
				});
				category.save();
				var forum = new Forum({
					category: ObjectId(category.id),
					order: 0,
					parent: null,
					name: "Welcome",
					slug: "welcome",
					description: "Welcome to Scribe!",
					topics: 0,
					messages: 0,
					latest: null
				});
				forum.save();
				category.forums = [forum];
				categories = [category];
			};
			var Promises = [];
			categories.forEach(function(category) {
				Promises.push(new Promise(function(resolve, reject) {
					Forum.find({ category: ObjectId(category._id) }, function(error, forums) {
						category.forums = forums;
						resolve();
					});
				}));
			});
			Promise.all(Promises).then(function() {
				res.render("index", {
					categories: categories
				});
			});
		});
	});
};