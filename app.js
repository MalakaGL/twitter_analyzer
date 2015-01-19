var express = require('express')
var app = express()
var path = require('path')
var db = require('./data/connectDb.js')
var port = 8888

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	console.log(req.path)
    res.sendFile('index.html', {root: 'public/html' })
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

var server = app.listen(port, function () {
	var host = server.address().address
	var port = server.address().port
	console.log('Example app listening at http://%s:%s', host, port)
})


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