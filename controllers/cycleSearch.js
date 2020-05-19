const mongoose = require('mongoose');
const Link = require('../models/Link');
const Item = require('../models/Item');

let cyclesFound = [];

async function cycleTiers(goalUserId, currentTierId, path, link) {
	console.log('go tiers');
	path += `:${link}`;
	const items = await Item.find({ tier: currentTierId });

	const itemData = await items.map((item) => {
		// console.log('Next item: ', item._id);
		return cycleItems(goalUserId, item._id, path);
	});

	return Promise.all(await itemData);
}

async function cycleItems(goalUserId, currentItemId, path) {
	console.log('go items');
	const links = await Link.find({ item: currentItemId, confirmed: 1 }).populate(
		{
			path: 'need',
			model: 'Need',
			populate: {
				path: 'tier',
				model: 'Tier',
			},
		}
	);

	const linkData = await links.map((link) => {
		console.log(
			goalUserId + ' ' + link.need.tier.user,
			goalUserId == String(link.need.tier.user)
		);
		if (String(link.need.tier.user) != goalUserId) {
			// console.log('Next tier: ', link.need.tier._id);
			return cycleTiers(goalUserId, link.need.tier._id, path, link._id);
		} else if (String(link.need.tier.user) == goalUserId) {
			console.log('cycle found');
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
		return cyclesFound;
	},

	sayHi: function () {
		return 'hi';
	},
};

exports.data = methods;
