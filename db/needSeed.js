const userUrl = 'http://localhost:8080/api/user';
const categoryUrl = 'http://localhost:8080/api/category';
const tierUrl = 'http://localhost:8080/api/tier';
const items = require('./needs.json');
const fetch = require('node-fetch');

const Tier = require('../models/Tier');
const Need = require('../models/Need');

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

		// console.log(items);
		return newItem;
	});
	return await Promise.all(itemData);
}

function loadItems(data) {
	data.forEach((el) => {
		let loadItemUrl = `${tierUrl}/need/${el.tierId}/${el.categoryId}`;
		fetch(loadItemUrl, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then(async (response) => await response.json())
			.catch((err) => console.log(err));
	});
}

async function setItems() {
	Need.deleteMany()
		.then(loadItems(await gatherItems()))
		.then(console.log)
		.catch(console.error);
	// .finally(process.exit);
}

setItems();

setTimeout(() => {
	process.exit();
}, 1000);
