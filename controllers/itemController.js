const express = require('express');
const router = express.Router();

const Item = require('../models/Item');
const User = require('../models/User');
const Tier = require('../models/Tier');

router.get('/:userId', (req, res) => {
	User.findById(req.params.userId).then((user) => {
		console.log(req.params.userId);
		console.log(user);
		Tier.find({ user: user._id }).then((tiers) => {
			Item.find({ tier: { $in: tiers }, cycle: undefined }).then((items) => {
				res.json(items);
			});
		});
	});
});

router.get('/:userId/cycle', (req, res) => {
	User.findById(req.params.userId).then((user) => {
		Tier.find({ user: user._id }).then((tiers) => {
			Item.find({ tier: { $in: tiers }, cycle: { $exists: true } }).then(
				(items) => {
					res.json(items);
				}
			);
		});
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
