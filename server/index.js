"use strict";

// Basic express setup:
const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://heroku_zm9d8g56:2lsbdridvb51nhj8b0ja151ege@ds141960.mlab.com:41960/heroku_zm9d8g56";

MongoClient.connect(MONGODB_URI, (err, db)=>{
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Tweeter app listening on port " + PORT);
  });

});