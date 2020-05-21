const express = require('express');
const router = express.Router();

const Need = require('../models/Need');
const Item = require('../models/Item');
const Link = require('../models/Link');
const Tier = require('../models/Tier');

router.get('/:userId', (req, res) => {
	Tier.find({ user: req.params.userId }).then((tier) => {
		res.json(tier);
	});
});

router.post('/item/:id/:categoryId', (req, res) => {
	const newItem = req.body;
	newItem.tier = req.params.id;
	newItem.category = req.params.categoryId;
	let itemId;
	Item.create(newItem)
		.then((created) => {
			res.json(created); // get the new item id from this
			itemId = created._id;
		})
		.then(() => {
			Need.find({ category: newItem.category }).then((data) =>
				data.forEach((need) => {
					{
						let newLink = {
							need: need._id,
							item: itemId,
							confirmed: 0,
						};
						Link.create(newLink);
					}
				})
			);
		});
});

router.post('/need/:id/:categoryId', (req, res) => {
	const newNeed = req.body;
	newNeed.tier = req.params.id;
	newNeed.category = req.params.categoryId;
	// console.log(req.body);
	let needId;
	Need.create(newNeed)
		.then((created) => {
			res.json(created); // get the new item id from this
			needId = created._id;
		})
		.then(() => {
			Item.find({ category: newNeed.category }).then((data) =>
				data.forEach((item) => {
					{
						let newLink = {
							need: needId,
							item: item._id,
							confirmed: 0,
						};
						Link.create(newLink);
					}
				})
			);
		});
});

module.exports = router;
