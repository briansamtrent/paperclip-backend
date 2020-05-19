const express = require('express');
const router = express.Router();

const Item = require('../models/Item');

router.get('/', (req, res) => {
	Item.find().then((allItems) => {
		res.json(allItems);
	});
});

router.delete('/:id', (req, res, next) => {
	Item.findOneAndDelete({ _id: req.params.id })
		.then((items) => {
			res.json(items);
		})
		.catch(next);
});

module.exports = router;
