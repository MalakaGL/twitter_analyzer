var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://allion:allion123@ds031271.mongolab.com:31271/twitterdb');
var tweets = mongoose.model('Tweets', new Schema({ tweet: Object, positive: Number, overall:Number, negative: Number, neutral: Number}));

tweets.find({}, function(err, document) { 
	for (var i=0; i < document.length; i++) {
		var tweet = document[i];
		console.log( i + "  " +  tweet['tweet']['text']);
		console.log( "Positive : " + tweet['tweet']['text'] + "\nNegative : " + tweet['negative'] + "\nNeutral : " + tweet['neutral'] )
    }
});
