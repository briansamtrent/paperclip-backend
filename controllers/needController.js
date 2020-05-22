const express = require('express');
const router = express.Router();

const Need = require('../models/Need');
const User = require('../models/User');
const Tier = require('../models/Tier');

router.get('/:userId', (req, res) => {
	User.findById(req.params.userId).then((user) => {
		Tier.find({ user: user._id }).then((tiers) => {
			Need.find({ tier: { $in: tiers }, cycle: undefined }).then((needs) => {
				res.json(needs);
			});
		});
	});
});

router.get('/:userId/cycle', (req, res) => {
	User.findById(req.params.userId).then((user) => {
		Tier.find({ user: user._id }).then((tiers) => {
			Need.find({ tier: { $in: tiers }, cycle: { $exists: true } }).then(
				(needs) => {
					res.json(needs);
				}
			);
		});
	});
});

router.delete('/:id', (req, res, next) => {
	Need.findOneAndDelete({ _id: req.params.id })
		.then((needs) => {
			res.json(needs);
			Link.deleteMany({ need: null }).catch(next);
		})
		.catch(next);
});

module.exports = router;
