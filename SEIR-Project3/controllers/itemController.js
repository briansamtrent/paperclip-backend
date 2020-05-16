const express = require('express');
const router = express.Router();

const Item = require('../models/Item');

router.get('/', (req, res) => {
	Item.find().then((allItems) => {
		res.json(allItems);
	});
});

module.exports = router;