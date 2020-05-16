const express = require('express');
const router = express.Router();

const Need = require('../models/Need');
const Item = require('../models/Item');

router.post('/item/:id/:categoryId', (req, res) => {
	const newItem = req.body;
	newItem.tier = req.params.id;
	newItem.category = req.params.categoryId;
	Item.create(newItem).then((created) => {
		res.json(created);
	});
});

router.post('/need/:id/:categoryId', (req, res) => {
	const newNeed = req.body;
	newNeed.tier = req.params.id;
	newNeed.category = req.params.categoryId;
	Need.create(newNeed).then((created) => {
		res.json(created);
	});
});

module.exports = router;
