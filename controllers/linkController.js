const Link = require('../models/Link');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	Link.find().then((allLinks) => {
		res.json(allLinks);
	});
});

module.exports = router;
