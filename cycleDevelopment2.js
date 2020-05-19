const mongoose = require('mongoose');
const Link = require('./models/Link');
const Item = require('./models/Item');

let itemId = '5ec2d63f2a4618598d630476';
itemId = '5ec4278d0f3a771794869c28'; //Rachel's Bread
const goalUser = '5ec427820f3a771794869c15';
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
	const links = await Link.find({ item: currentItemId }).populate({
		path: 'need',
		model: 'Need',
		populate: {
			path: 'tier',
			model: 'Tier',
		},
	});

	const linkData = await links.map((link) => {
		if (link.need.tier.user != goalUserId) {
			// console.log('Next tier: ', link.need.tier._id);
			return cycleTiers(goalUserId, link.need.tier._id, path, link._id);
		} else if (link.need.tier.user == goalUserId) {
			console.log('cycle found');
			cyclesFound.push(path + ':' + link._id);
			return path;
		}
	});

	return Promise.all(await linkData);
}

var methods = {
	cycleSearch: async function (goalUserId, startItemId) {
		await cycleItems(goalUserId, startItemId, '');
		return cyclesFound;
	},

	sayHi: function () {
		return 'hi';
	},
};

exports.data = methods;
