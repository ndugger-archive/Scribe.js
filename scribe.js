var mongoose = require("mongoose");
var express = require("express");
var engine = require("ejs-locals");
var app = express();
var fs = require("fs");

// ----------
// EJS Alternatives (since ejs-locals is unmaintained):
// https://github.com/linkedin/dustjs
// https://github.com/baryshev/ect
// ----------

// Models
var models = [
	"Author",
	"Category",
	"Forum",
	"Group",
	"Message",
	"Topic"
];
models.forEach(function(model) {
	require(__dirname + "/models/" + model + ".js")(app);
});

// Database
mongoose.connect("mongodb://localhost/scribe");

// TODO: Where can I get this from?
var theme = "default";

// Views/Theme
app.engine("ejs", engine);
app.set("views", __dirname + "/themes/" + theme);
app.use("/theme", express.static(__dirname + "/themes/" + theme + "/public"));
app.set("view engine", "ejs");

// Controllers
var controllers = [
	"Category",
	"Forum",
	"Index"
];
controllers.forEach(function(controller) {
	require(__dirname + "/controllers/" + controller + ".controller.js")(app);
});

// Server
var server = app.listen(80, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Scribe has started (http://%s:%s)", host, port);
});
