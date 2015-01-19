var express = require('express')
var app = express()
var path = require('path')
var db = require('./data/connectDb.js')
var port = 8888

//app.use(express.static(path.join(__dirname, 'public')));
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile('./public/html/index.html');
	//res.send('Hello World!');
});

app.get('/graph', function(req, res) {
	db.data('_id', 1, 1000, function(err, data){
		res.json(data);
	})
});

app.get('/getData/', function(req, res) {
	db.getDataRange(req['query'], function(err, data){
		res.json(data);
	})
});

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});

//app.get('/latest', function(req, res) {
//	db.data('_id', -1, 10, function(err, data){
//		res.json(data);
//	})
//})
//
//app.get('/positive', function(req, res) {
//	db.data('positive', -1, 10, function(err, data){
//		res.json(data);
//	})
//});
//
//app.get('/negative', function(req, res) {
//	db.data('negative', -1, 10, function(err, data){
//		res.json(data);
//	})
//});