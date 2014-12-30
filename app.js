var mongoose = require("mongoose");
var express = require("express");
var engine = require("ejs-locals");
var app = express();
var fs = require("fs");

// ----------
// EJS Alternatives (since ejs-locals in unmaintained):
// https://github.com/linkedin/dustjs
// https://github.com/baryshev/ect
// ----------

// Models
fs.readdirSync(__dirname + "/models").forEach(function(file) {
	require(__dirname + "/models/" + file)(app);
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
fs.readdirSync(__dirname + "/controllers").forEach(function(file) {
	require(__dirname + "/controllers/" + file)(app);
});

// Server
var server = app.listen(80, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Scribe is now listening at http://%s:%s", host, port);
});