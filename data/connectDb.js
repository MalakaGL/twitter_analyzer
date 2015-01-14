var mongoose = require('mongoose')
var Schema = mongoose.Schema
var tweets;

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

var getData = function(sorting, order, limit, callBack){
    console.log("Called");
    var query = tweets.find( { }, { 'tweet.created_at' : 1, 'overall': 1 } );
    var q = {};
    query.sort({'tweet.created_at':1}).limit(limit);
    query.exec(function(err, data) {
        callBack(err, data)
    });
};

var getRange = function(args, callBack){
    var from = args['date_from']+" "+args['time_from'];
    console.log(new Date(from).toDateString());
    var query = tweets.find({});
    query.where('tweet.created_at').gt()
}

module.exports.data = getData;
module.exports.getDataRange = getRange;