const userUrl = 'http://localhost:8080/api/user';
const categoryUrl = 'http://localhost:8080/api/category';
const tierUrl = 'http://localhost:8080/api/tier';
const items = require('./items.json');
const fetch = require('node-fetch');

const Tier = require('../models/Tier');
const Item = require('../models/Item');

async function gatherItems() {
	// first go through each tier upload and insert the userId
	const itemData = items.map(async (item) => {
		let newItem = {};
		const catResponse = await fetch(
			categoryUrl + '/' + item.category
		).catch((err) => console.log(err));
		newItem.categoryId = (await catResponse.json())._id;

		const userResponse = await fetch(
			userUrl + '/' + item.userName
		).catch((err) => console.log(err));
		newItem.userId = (await userResponse.json())._id;

		const tierResponse = await Tier.findOne({
			user: newItem.userId,
			rank: item.rank,
		}).catch((err) => console.log(err));
		newItem.tierId = await tierResponse._id;

		newItem.picture = item.picture;
		newItem.description = item.description;

		// console.log(items);
		return newItem;
	});
	return await Promise.all(itemData);
}

function loadItems(data) {
	data.forEach((el) => {
		let body = {
			picture: el.picture,
			description: el.description,
		};
		let loadItemUrl = `${tierUrl}/item/${el.tierId}/${el.categoryId}`;
		console.log(loadItemUrl);
		console.log(body);
		fetch(loadItemUrl, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify(body),
		}).catch((err) => console.log(err));
	});
}

async function setItems() {
	Item.deleteMany()
		.then(loadItems(await gatherItems()))
		.then(console.log)
		.catch(console.error)
		.finally(process.exit);
}

setItems();
