// require('dotenv').config({path: '../.env'});

// const settings = require('../knexfile.js')['development'];
// //console.log(settings);

// const knex = require('knex')(settings);

const knexFunctions = require('./test-queries.js');

knexFunctions.findResourceByTopicId(1, function(input){console.log("Testing finding resource by topic id:");console.log(input);});
