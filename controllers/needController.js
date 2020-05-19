const express = require('express');
const router = express.Router();

const Need = require('../models/Need');
const Tier = require('../models/User');

router.get('/', (req, res) => {
	Need.find().then((allNeeds) => {
		res.json(allNeeds);
	});
});

router.delete('/:id', (req, res, next) => {
	Need.findOneAndDelete({ _id: req.params.id })
		.then((needs) => {
			res.json(needs);
		})
		.catch(next);
});

module.exports = router;
