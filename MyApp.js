var express = require('express')
var app = express()
var path = require('path')
var db = require('./data/connectDb.js')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	console.log(req.path)
    res.sendFile('index.html', {root: 'public/html' })
});

app.get('/latest', function(req, res) {
	db.connectDb();
	db.data('_id', -1, 10, function(err, data){
		res.json(data);
	})
})

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

app.get('/graph', function(req, res) {
	var query = tweets.find({});
	query.sort({'_id':-1}).limit(10);
	query.exec(function(err, document) {
		res.json(document);
	})
});

var server = app.listen(3000, function () {
	var host = server.address().address
	var port = server.address().port
	console.log('Example app listening at http://%s:%s', host, port)
})
