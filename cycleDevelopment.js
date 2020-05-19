const mongoose = require('mongoose');
const Link = require('./models/Link');
const Item = require('./models/Item');
const Need = require('./models/Need');
const Tier = require('./models/Tier');
const User = require('./models/User');

let itemId = '5ec2d63f2a4618598d630476';
itemId = '5ec40c0b29a2bc04d468b8fd'; //Rachel's Bread
const goalUser = '5ec40c0329a2bc04d468b8e9';
let cyclesFound = [];

function cycleLinks(goalUserId, currentItemId, cyclesTracker, linkId) {
	cyclesTracker.push(linkId);
	Link.find({ item: currentItemId })
		.populate({
			path: 'need',
			model: 'Need',
			populate: {
				path: 'tier',
				model: 'Tier',
			},
		})
		.then((links) => {
			//Look at every need attached to this item
			links.map((link) => {
				console.log(
					'link:',
					link._id,
					`${link.item.tier.user} -> ${link.item.description} -> ${link.need.tier.user}`
				);
				console.log(cyclesTracker);
				if (link.need.tier.user != goalUserId) {
					let tier = link.need.tier;
					Item.find({ tier: tier }).then((itemMatchTier) => {
						itemMatchTier.forEach((item) => {
							cycleLinks(goalUserId, item._id, [...cyclesTracker], link._id);
						});
					});
				} else if (link.need.tier.user == goalUserId) {
					cyclesTracker.push(link._id);
					console.log('cycle found');
				}
			});
		});
}

async function kickIt() {
	console.log(await cycleLinks(goalUser, itemId, [...cyclesFound], ''));
}

kickIt();
