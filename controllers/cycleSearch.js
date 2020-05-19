const mongoose = require('mongoose');
const Link = require('../models/Link');
const Item = require('../models/Item');

let cyclesFound = [];

async function cycleTiers(goalUserId, currentTierId, path, link) {
	path += `:${link}`;
	const items = await Item.find({ tier: currentTierId });

	const itemData = await items.map((item) => {
		// console.log('Next item: ', item._id);
		return cycleItems(goalUserId, item._id, path);
	});

	return Promise.all(await itemData);
}

async function cycleItems(goalUserId, currentItemId, path) {
	const links = await Link.find({
		item: currentItemId,
		confirmed: 1,
		cycle: undefined,
	}).populate({
		path: 'need',
		model: 'Need',
		populate: {
			path: 'tier',
			model: 'Tier',
		},
	});

	const linkData = await links.map((link) => {
		if (String(link.need.tier.user) != goalUserId) {
			// console.log('Next tier: ', link.need.tier._id);
			return cycleTiers(goalUserId, link.need.tier._id, path, link._id);
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
		await cycleItems(goalUserId, startItemId, '');
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
		return 'hi';
	},
};

exports.data = methods;
