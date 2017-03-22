/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  "use strict";

  //Import Time Ago jQuery Plugin
  jQuery("time.timeago").timeago();

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

  const renderTweets = function (tweets) {
    tweets.forEach(function (tweet) {
      $('#tweets-container').append(createTweetElement(tweet));
    })
  };

  $.ajax({
    url: "/tweets",
    method: "get",
    success: function (data, textStatus, jqXHR) {
      renderTweets(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });

  const $submitBtn = $(".new-tweet form input[type='submit']");
  const $form = $(".new-tweet form");

  $form.validate({
    rules: {
      "text": {
        required: true,
        maxlength: 140
      }
    },
    messages: {
      "text": {
        required: "Your tweet is empty.",
        maxlength: "Your tweet is too long."
      }
    },

    errorPlacement : function (error, element) {
      $(error).insertAfter($submitBtn);
    },

    submitHandler: function(form){
      console.log($(form).serialize());
    }
  });

  /*$submitBtn.click(function (e) {
    e.preventDefault();
    console.log($form.serialize());
  })*/

});