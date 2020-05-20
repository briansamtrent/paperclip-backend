const mongoose = require('mongoose');
const Link = require('../models/Link');
const Item = require('../models/Item');
const Tier = require('../models/Tier');

let cyclesFound = [];

async function cycleItems(goalUserId, currentTierId, path, link) {
	path += `:${link}`;
	const items = await Item.find({ tier: currentTierId });

	const itemData = await items.map((item) => {
		// console.log('Next item: ', item._id);
		return cycleLinks(goalUserId, item._id, path);
	});

	return Promise.all(await itemData);
}

async function cycleTiers(goalUserId, currentUserId, rank, path, link) {
	// gte rank is bc user will give away an item less valuable than the one they're gaining
	const tiers = await Tier.find({
		user: currentUserId,
		rank: {
			$gte: rank,
		},
	});

	const tierData = await tiers.map((tier) => {
		return cycleItems(goalUserId, tier._id, path, link._id);
	});

	return Promise.all(await tierData);
}

async function cycleLinks(goalUserId, currentItemId, path) {
	const links = await Link.find({
		item: currentItemId,
		confirmed: 1, // only confirmed trades available for cycling
		cycle: undefined, // only trades not currently assigned a cycle
	}).populate({
		path: 'need',
		model: 'Need',
		populate: {
			path: 'tier',
			model: 'Tier',
		},
	});

	const linkData = await links.map((link) => {
		// look for all tiers on the user

		if (String(link.need.tier.user) != goalUserId) {
			return cycleTiers(
				goalUserId,
				link.need.tier.user,
				link.need.tier.rank,
				path,
				link._id
			);
		} else if (String(link.need.tier.user) == goalUserId) {
			// console.log('cycle found');
			cyclesFound.push(path + ':' + link._id);
			return path;
		}
	});

	return Promise.all(await linkData);
}

var methods = {
	cycleSearch: async function (goalUserId, startItemId) {
		cyclesFound = [];
		await cycleLinks(goalUserId, startItemId, '');
		console.log(cyclesFound);
		if (cyclesFound.length) {
			const selectedCycle = cyclesFound
				.sort((a, b) => b.length - a.length)[0] // favor long cycles
				.split(':');
			selectedCycle.splice(0, 1); // lose the leading empty ''
			return selectedCycle;
		} else {
			return 0;
		}
	},

	sayHi: function () {
		return 'Hi';
	},
};

exports.data = methods;
