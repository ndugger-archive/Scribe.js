var Promise = require("bluebird");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var Category = mongoose.model("Category");
var Forum = mongoose.model("Forum");

module.exports = function(app) {
	app.get("/:category/:forum", function (req, res) {
		var category = req.params.category;
		var forum = req.params.forum;
		// Find the Category
		Category.findOne({ 
			slug: category 
		}, function(error, category) {
			// Find the Forum
			Forum.findOne({ 
				_category: ObjectId(category._id),
				slug: forum
			}, function(error, forum) {
				// Find the Topics
				Topic.find({
					_forum: ObjectId(forum._id)
				}, function(error, topics) {
					var Promises = [];
					topics.forEach(function(topic) {
						Promises.push(new Promise(function(resolve, reject) {
							Author.find({
								_id: ObjectId(topic._author)
							}, function(error, author) {
								topic.author = author;
								resolve();
							});
						}));
						Promises.push(new Promise(function(resolve, reject) {
							Message.find({
								_id: ObjectId(topic._latest)
							}, function(error, latest) {
								topic.latest = latest;
								resolve();
							});
						}));
					});
					forum.topics = topics;
					res.render("forum", {
						category: category,
						forum: forum
					});
				});
			});
		});
	});
};