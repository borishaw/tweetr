"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function (newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback);
    },

    // Get all tweets in `db`
    getTweets: function (callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        callback(null, tweets);
      });
    },

    //Like a tweet
    likeTweet: function(tweet_id){
      return db.collection("tweets").findOneAndUpdate({tweet_id: tweet_id}, {$inc : {"content.likes": 1}});
    },

    //Unlike a tweet
    unlikeTweet: function(tweet_id){
      return db.collection("tweets").findOneAndUpdate({tweet_id: tweet_id}, {$inc : {"content.likes": -1}});
    }
  }
};