const userUrl = 'http://localhost:8080/api/user';
const tiers = require('./tiers.json');
const fetch = require('node-fetch');

const Tier = require('../models/Tier');

async function loadTiers() {
	// first go through each tier upload and insert the userId
	const userIds = tiers.map(async (tier) => {
		const getUserIdUrl = `${userUrl}/${tier.userName}/name`;

		const response = await fetch(getUserIdUrl, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}).catch((err) => console.log(err));
		const r = await response.json();
		tier.userId = r._id;

		// now load tier
		const loadTierUrl = `${userUrl}/${tier.userId}/tier`;
		const body = JSON.stringify({ rank: tier.rank });
		console.log(loadTierUrl);
		console.log(body);
		await fetch(loadTierUrl, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: body,
		}).catch((err) => console.log(err));
		return r;
	});
	return await Promise.all(userIds);
}

async function setTiers() {
	Tier.deleteMany()
		.then(async () => {
			console.log('Tiers Deleted');
			await loadTiers();
			console.log(tiers);
		})
		.then(console.log)
		.catch(console.error)
		.finally(process.exit);
}

setTiers();
