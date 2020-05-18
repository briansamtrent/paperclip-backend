const mongoose = require('mongoose');

const Link = require('../models/Link');

const Item = require('../models/Item');
const Need = require('../models/Need');
const Tier = require('../models/Tier')

const itemId = '5ec2ba4fcf745a352f7bdacb'

Link.find({ item: itemId }).populate({
  path: 'need',
  model: 'Need',
  populate: {
    path: 'tier',
    model: 'Tier'
  }
}).then((data) => {
	data.forEach((item) => {
		// console.log(item.need.tier);
		let tier = item.need.tier;
		Item.find({ tier: tier}).then((data) => {
			console.log(data);
			
		})
	})
	
})

const goalUser = '5ec2b92dcf745a352f7bdac8'