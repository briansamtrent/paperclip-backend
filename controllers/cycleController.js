const express = require('express');
const router = express.Router();

const Cycle = require('../models/Cycle');

router.get('/', (req, res) => {
	Cycle.find().then((allCycles) => {
		res.json(allCycles);
	});
});

module.exports = router;
