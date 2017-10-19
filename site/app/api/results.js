var pg = require('pg')
var db = require('../../config/db.js')

var dbConfig = {
    user: 'appservice', 
    database: 'vote', 
    password: 'password', 
    host: 'localhost', 
    port: 5432, 
    max: 10, 
    idleTimeoutMillis: 30000, 
};

const pool = new pg.Pool(dbConfig);

module.exports = {
    getElections: function(req, res, next) {
		pool.connect(function(err, client, done) {
			if(err){
				console.log("Error: " + err);
				res.status(400).send(err);
			}
			client.query("SELECT ufn_get_elections() as elections", function(err, result) {
				done(err);
				if(err) {
					console.log(err);
					res.status(400).send(err);
				}
				res.status(200).send(result.rows[0]["elections"]);
			})
		})
	},	
    getStates: function(req, res, next) {
		pool.connect(function(err, client, done) {
			if(err){
				console.log("Error: " + err);
				res.status(400).send(err);
			}
			client.query("SELECT ufn_get_states() AS states", function(err, result) {
				done(err);
				if(err) {
					console.log(err);
					res.status(400).send(err);
				}
				res.status(200).send(result.rows[0]["states"]);
			})
		})
	},
	getCounties: function(req, res, next) {
		pool.connect(function(err, client, done) {
			if(err){
				console.log("Error: " + err);
				res.status(400).send(err);
			}
			client.query("SELECT ufn_get_counties($1::TEXT) AS counties" , [req.query.state], function(err, result){
				done(err);
				if(err) {
					console.log("Error: " + err);
					res.status(400).send(res);
				}
				res.status(200).send(result.rows[0]["counties"]);
			})			
		})
	},
	getStateResultsbyCounty: function(req, res, next) {
		pool.connect(function(err, client, done) {
			if(err){
				console.log("Error: " + err);
				res.status(400).send(err);
			}
			client.query("SELECT * FROM ufn_get_state_results_by_county($1::TEXT, $2::INT)", [req.body.state, req.body.election], function(err, result) {
				done(err)
				if(err) {
					console.log(err);
					res.status(400).send(err);
				}
				res.status(200).send(result.rows);
			})
		})
	},	
    getCountyResults: function(req, res, next) {
		pool.connect(function(err, client, done) {
			if(err){
				console.log("Error: " + err);
				res.status(400).send(err);
			}
			client.query("SELECT * FROM ufn_get_county_results($1::INT,$2::INT)", [req.body.fips, req.body.election], function(err, result) {
				done(err)
				if(err) {
					console.log(err);
					res.status(400).send(err);
				}
				res.status(200).send(result.rows[0]);
			})
		})
	}
}