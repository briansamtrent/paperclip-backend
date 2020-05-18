const mongoose = require('mongoose');
const Link = require('../models/Link');
const Item = require('../models/Item');
const Need = require('../models/Need');
const Tier = require('../models/Tier');
const User = require('../models/User');

let itemId = '5ec2d63f2a4618598d630476';
itemId = '5ec2d7252a4618598d63047d'; //Akrom's rice
const goalUser = '5ec2d5692a4618598d63046b';

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
		.then((itemNeedMatch) => {
			//Look at every need attached to this item
			itemNeedMatch.forEach((matchedNeed) => {
				console.log('matchedNeed:', matchedNeed.item.tier);
				// console.log(item);
				if (matchedNeed.item.tier.user._id != goalUserId) {
					let tier = matchedNeed.need.tier;
					Item.find({ tier: tier }).then((itemMatchTier) => {
						console.log(itemMatchTier);
						itemMatchTier.forEach((item) => {
							cycleLinks(goalUser, item._id);
						});
						// cycleLinks(goalUser, data._id)
					});
				} else{
					console.log('cycle found')
				}
			});
		});
}

cycleLinks(goalUser, itemId);
