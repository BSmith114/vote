var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var pg = require('pg');
var routes = require('./app/routes');

// configuration
var db = require('./config/db')
var port = process.env.PORT || 3000;
const pool = new pg.Pool(db.dbConfig)

app.use(express.static(__dirname + '/public')); 
app.use(methodOverride('X-HTTP-Method-Override')); 

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json());  
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: false })); 



// routes 
app.use(routes); 

// start app 
app.listen(port);	
console.log('Magic happens on port ' + port);
exports = module.exports = app;