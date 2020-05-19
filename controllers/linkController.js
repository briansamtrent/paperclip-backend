const Link = require('../models/Link');
const Tier = require('../models/Tier');
const Need = require('../models/Need');
const Cycle = require('../models/Cycle');

var search = require('./cycleSearch.js');

const express = require('express');
const router = express.Router();

router.get('/:userId/unconfirmed', async (req, res) => {
	const tiers = await Tier.find({ user: req.params.userId }).catch(
		console.error
	);
	const needs = await Need.find({ tier: { $in: tiers } }).catch(console.error);
	Link.find({ confirmed: 0, need: { $in: needs } }).then((allLinks) => {
		res.json(allLinks);
	});
});

router.patch('/:linkId/confirm', async (req, res) => {
	const link = await Link.findById(req.params.linkId).catch(console.error);
	link.confirmed = req.body.confirmation;
	await link.save();
	if (req.body.confirmation == 1) {
		console.log('item: ', link.item._id);
		console.log('user: ', link.item.tier.user);
		const cycles = await search.data.cycleSearch(
			link.item.tier.user,
			link.item._id
		);
		if (cycles) {
			Cycle.create({ links: cycles }).then((newCycle) => {
				Link.find({ _id: { $in: cycles } }).then((links) => {
					links.forEach(async (link) => {
						link.cycle = newCycle.id;
						await link.save();
						console.log(link);
					});
				});
			});
		}
	}
	res.json(link);
});

router.get('/', (req, res) => {
	Link.find().then((allLinks) => {
		res.json(allLinks);
	});
});

module.exports = router;
