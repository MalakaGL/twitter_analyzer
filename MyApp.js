var express = require('express')
var app = express()
var path = require('path');
var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://allion:allion123@ds031271.mongolab.com:31271/twitterdb');
var tweets = mongoose.model('Tweets', new Schema({ '_id': Number, timestamp: String, tweet: Object, positive: Number, overall:Number, negative: Number, neutral: Number}));

app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', function(req, res) {
	console.log(req.path)
    res.sendFile('index.html', {root: 'Public/html' })
});

app.get('/latest', function(req, res) {
	var query = tweets.find()
	query.sort({'_id':-1}).limit(10);
	query.exec(function(err, document) {
		res.json(document);
	})
});

app.get('/positive', function(req, res) {
	var query = tweets.find({});
	query.sort({'positive':-1}).limit(10);
	query.exec(function(err, document) {
		res.json(document);
	})
});

app.get('/negative', function(req, res) {
	var query = tweets.find({});
	query.sort({'negative':-1}).limit(10);
	query.exec(function(err, document) {
		res.json(document);
	})
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})

/*
var express = require('express')
var app = express()
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://allion:allion123@ds031271.mongolab.com:31271/twitterdb');
var tweets = mongoose.model('Tweets', new Schema({ tweet: Object, positive: Number, overall:Number, negative: Number, neutral: Number}));

app.get('/', function(req, res) {
	console.log(req.path)
    res.sendFile('index.html', {root: 'Front' })
});

app.get('/home', function(req, res) {
	tweets.find({}, function(err, document) {
		res.json(document);
	})
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})*/