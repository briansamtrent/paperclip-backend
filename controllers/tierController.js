const express = require('express');
const router = express.Router();

const Need = require('../models/Need');
const Item = require('../models/Item');
const Link = require('../models/Link');

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

	// get every Need with the same category as the item

	// create a pair object with the item Id and the Need Id
	// where not existing already, create Link document with the item Id and the Need Id
});

router.post('/need/:id/:categoryId', (req, res) => {
	const newNeed = req.body;
	newNeed.tier = req.params.id;
	newNeed.category = req.params.categoryId;
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

	// get every Item with the same category as the Need
	// create a pair object with the item Id and the Need Id
	// where not existing already, create Link document with the item Id and the Need Id
});

router.delete('/:id', (req, res, next) => {
	User.findOneAndDelete({ _id: req.params.id })
		.then((users) => {
			res.json(users);
		})
		.catch(next);
});

module.exports = router;
