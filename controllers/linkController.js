const Link = require('../models/Link');
const Tier = require('../models/Tier');
const Need = require('../models/Need');
const Cycle = require('../models/Cycle');
const Item = require('../models/Item');
const User = require('../models/User');

var search = require('./cycleSearch.js');

const express = require('express');
const router = express.Router();

router.get('/unconfirmed', async (req, res) => {
	Link.find({ confirmed: 0 }).then((allLinks) => {
		res.json(allLinks);
	});
});

router.get('/:userId/unconfirmed', async (req, res) => {
	const tiers = await Tier.find({ user: req.params.userId }).catch(
		console.error
	);
	const needs = await Need.find({ tier: { $in: tiers } }).catch(console.error);
	Link.find({ cycle: { $exists: true } }).then((allLinks) => {
		console.log(allLinks);
		// res.json(allLinks);
	});
});

router.get('/:userId/cycle', async (req, res) => {
	Tier.find({ user: req.params.userId }).then(async (allLinks) => {
		const userTiers = await allLinks.map((link) => link._id);
		Item.find({ tier: { $in: userTiers } }).then(async (allItems) => {
			// console.log(allItems);
			const userCycledItems = await allItems.filter((item) => {
				return item.cycle;
			});
			const userCycles = await userCycledItems.map((item) => {
				return item.cycle;
			});
			Link.find({ cycle: { $in: userCycles } }).then((allLinks) => {
				res.json(
					allLinks.filter((link) => link.item.tier.user == req.params.userId)
				);
			});
		});
	});
});

router.patch('/:linkId/confirm', async (req, res) => {
	const link = await Link.findById(req.params.linkId).catch(console.error);
	if (link) {
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

							Item.findById(link.item._id).then((item) => {
								item.cycle = newCycle.id;
								item.save();
							});

							Need.findById(link.need._id).then((need) => {
								need.cycle = newCycle.id;
								need.save();
							});

							User.findById(link.item.tier.user).then((user) => {
								user.cycle.push(newCycle.id);
								user.save();
							});
						});
						res.json(link); // confirmed 1 and cycle found
					});
				});
			} else {
				res.json(link); // confirmed 1 and no cycle
			}
		} else {
			res.json(link); // confirmed 0 or -1 so no cycle
		}
	} else {
		res.json(['Not Found']);
	}
});

router.get('/:linkId', async (req, res) => {
	Link.findById(req.params.linkId).then((allLinks) => {
		res.json(allLinks);
	});
});

// router.get('/', (req, res) => {
// 	Link.find().then((allLinks) => {
// 		res.json(allLinks);
// 	});
// });

module.exports = router;
