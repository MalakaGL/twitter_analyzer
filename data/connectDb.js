var mongoose = require('mongoose')
var Schema = mongoose.Schema
var db = {};
var tweets;

var connectToDb = function(){
    mongoose.connection.on('open', function () {
        console.log('Connected to mongo server.');
    });
    mongoose.connection.on('error', function (err) {
        console.log('Could not connect to mongo server!');
        console.log(err);
    });

    mongoose.connect('mongodb://allion:allion123@ds031271.mongolab.com:31271/twitterdb');

    tweets = mongoose.model(
        'Tweets',
        new Schema({
            '_id': Number,
            timestamp: String,
            tweet: Object,
            positive: Number,
            overall:Number,
            negative: Number,
            neutral: Number
        }));
}

 var getData = function(sorting, order, limit, callBack){
    var query = tweets.find({});
    query.sort({'positive':-1}).limit(10);
    query.exec(function(err, data) {
        callBack(err, data);
    })
}

module.exports.data = getData();
module.exports.connectDb = connectToDb()