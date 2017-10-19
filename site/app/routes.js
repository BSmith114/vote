var express = require('express')
var router = express.Router();
var bodyParser = require('body-parser');
var api = require('./api/results')

/* API Routes */
router.route('/api/get-elections')
	.get(api.getElections)

router.route('/api/get-states')
	.get(api.getStates)

router.route('/api/get-counties')
	.get(api.getCounties)

router.route('/api/get-state-results-by-county')
	.post(api.getStateResultsbyCounty)

router.route('/api/get-county-results')
	.post(api.getCountyResults)

/* Website Routes */
router.get('*', function(req, res) {
	res.sendfile('./public/index.html')
});

module.exports = router;
