"use strict";

// Basic express setup:
require('dotenv').config();
const PORT          = process.env.PORT;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;

MongoClient.connect(MONGODB_URI, (err, db)=>{
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/tweets", tweetsRoutes);

  app.listen(PORT || 5000, () => {
    console.log("Tweeter app listening on port " + PORT);
  });

});