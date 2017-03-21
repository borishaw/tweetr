/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  "use strict";

  //Import Time Ago jQuery Plugin
  jQuery("time.timeago").timeago();

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  const createTweetElement = function (tweetObj) {

    //use Time Ago plugin to calculate tweet publish time
    let timeAgo = jQuery.timeago(tweetObj.created_at);

    return `<article class="tweet">
          <header>
            <img src="${tweetObj.user.avatars.regular}" alt="Bill Fields Logo">
            <h2 class="user-name">${tweetObj.user.name}</h2>
            <span class="user-id">${tweetObj.user.handle}</span>
          </header>
          <section class="tweet-content">
            <p>${tweetObj.content.text}</p>
          </section>
          <footer>
            <span class="publish-time">${timeAgo}</span>
            <span class="tweet-functions">
              <i class="fa fa-flag" aria-hidden="true"></i>
              <i class="fa fa-retweet" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
            </span>
          </footer>
        </article>`
  };

  const renderTweets = function (arr) {
    arr.forEach(function (tweetObj, index, array) {
      $('#tweets-container').append(createTweetElement(tweetObj));
    })
  };

  renderTweets(data);

});