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
    //Sort tweets according to time created
    tweets.sort(function(a, b){
      return b.created_at - a.created_at
    });

    tweets.forEach(function (tweet) {
      $('#tweets-container').append(createTweetElement(tweet));
    })
  };

  //Fetch Tweets with AJAX when page loads
  function getTweets(){
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
  }
  getTweets();


  //jQuery elements
  const $submitBtn = $(".new-tweet form input[type='submit']");
  const $form = $(".new-tweet form");
  const $composeBtn = $("nav").find(".compose-btn");
  const $newTweetSection = $(".new-tweet");

  //Form Validation
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
      $.ajax({
        url: "/tweets",
        method: "post",
        data: $(form).serialize(),
        success: function (data, textStatus, jqXHR) {
          $('#tweets-container').html(''); //Clear current tweets
          $form.find('textarea').val(''); //Clear text area when tweet successfully submitted
          getTweets();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(errorThrown);
        }
      });
    }
  });

  //Compose button slide toggle event
  $newTweetSection.hide(); //Hide first
  $composeBtn.click(function () {
    $newTweetSection.slideToggle({
      complete: function (){
        $form.find('textarea').focus(); //Focus the text area when slide is complete
      }
    });
  });
});