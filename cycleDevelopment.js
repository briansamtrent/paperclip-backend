const mongoose = require('mongoose');
const Link = require('./models/Link');
const Item = require('./models/Item');
const Need = require('./models/Need');
const Tier = require('./models/Tier');
const User = require('./models/User');

let itemId = '5ec2d63f2a4618598d630476';
itemId = '5ec3beaa187252e38643f92f'; //Rachel's Bread
const goalUser = '5ec3be74187252e38643f91f';
let cyclesFound = [[]];

async function cycleLinks(goalUserId, currentItemId) {
	console.log('searching:', currentItemId);
	await Link.find({ item: currentItemId })
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
			console.log(links.length);
			if (links.length === 0) {
				// this is a node with no children
				cyclesFound[0].pop();
				console.log('this is a node with no children so we POP', cyclesFound);
			}
			links.forEach((link) => {
				cyclesFound[0].push(link._id);
				console.log('this is a new node so we PUSH it', cyclesFound, link._id);
				console.log('link:', link);
				// console.log(item);
				// console.log(cyclesFound);
				console.log(
					'user with need:',
					link.need.tier.user,
					link.need.tier.user === goalUserId
				);
				if (link.need.tier.user != goalUserId) {
					let tier = link.need.tier;
					Item.find({ tier: tier }).then((itemMatchTier) => {
						console.log(itemMatchTier);
						itemMatchTier.forEach((item) => {
							cycleLinks(goalUserId, item._id);
						});
						// cycleLinks(goalUser, data._id)
					});
				} else if (link.need.tier.user === goalUserId) {
					console.log('cycle found');
					// found a cycle so store the traverse record by unshifting it down the history array
					cyclesFound.unshift([]);
				}
			});
		});
}

cycleLinks(goalUser, itemId);
