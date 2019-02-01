"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

const queries = require("./db/knex-queries.js");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));




// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// route setup for testing purposes
app.get("/users", (req, res) => {
  res.render("users");
});

// route setup for testing purposes
app.get("/settings", (req, res) => {
  res.render("settings");
});

// route setup for testing purposes
app.get("/login", (req, res) => {
  res.render("login");
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get("/popTest", (req, res) => {
  queries.findAllResources((popTest) => {
    res.json(popTest);
  });
});


// route setup for testing purposes
app.get("/resource", (req, res) => {
  res.render("resource");
});

// route setup for testing purposes
app.post("/users", (req, res) => {
  queries.findResourceByResourceId(1, (testData) => {
    console.log('Data Recieved');
    res.redirect(testData[0].url);
  });
});

app.post("/login", (req, res) => {
  res.redirect("/");
});

app.post("/register", (req, res) => {
  res.redirect("/");
});



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
