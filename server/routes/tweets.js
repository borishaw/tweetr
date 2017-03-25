"use strict";

const userHelper = require("../lib/util/user-helper")
const simulateDelay = require("../lib/util/simulate-delay");
const express = require('express');
const tweetsRoutes = express.Router();

//Decode & encode html entities
const Entities = require("html-entities").AllHtmlEntities;
const entities = new Entities();
const uuidV1 = require('uuid/v1');

module.exports = function (DataHelpers) {

  tweetsRoutes.get("/", function (req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({error: err.message});
      } else {
        res.json(tweets);
      }
    });

  });

  tweetsRoutes.post("/", function (req, res) {
    if (!req.body.text) {
      res.status(400).json({error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: entities.encode(req.body.text), //Encode html entities before storing in DB to prevent XSS
        likes: 0
      },
      created_at: Date.now(),
      tweet_id: uuidV1()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({error: err.message});
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.put("/:id/like", function (req, res) {
    DataHelpers.likeTweet(req.params.id) ? res.status(200).send("Success") : res.status(400).send("Failed")
  });

  tweetsRoutes.put("/:id/unlike", function (req, res) {
    DataHelpers.unlikeTweet(req.params.id) ? res.status(200).send("Success") : res.status(400).send("Failed")
  })
  return tweetsRoutes;

}
