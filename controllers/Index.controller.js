var Promise = require("bluebird");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var Group = mongoose.model("Group");
var Category = mongoose.model("Category");
var Forum = mongoose.model("Forum");

module.exports = function(app) {
	app.get("/", function (req, res) {
		Category.find({}, function (error, categories) {
			if (!categories.length) {
				/*var category = new Category({
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
				categories = [category];*/
			};
			var promises = [];
			categories.forEach(function(category) {
				promises.push(new Promise(function(resolve, reject) {
					Forum.find({ 
						_category: ObjectId(category._id) 
					}, function(error, forums) {
						category.forums = forums;
						resolve();
					});
				}));
			});
			Promise.all(promises).then(function() {
				Group.find({}, function(error, groups) {
					res.render("index", {
						categories: categories,
						groups: groups
					});
				});
			});
		});
	});
};