const url = 'http://localhost:8080/api/user';
const users = require('./users.json');
const fetch = require('node-fetch');
const User = require('../../models/User');
const Link = require('../../models/Link');
const Item = require('../../models/Item');
const Need = require('../../models/Need');
const Tier = require('../../models/Tier');
const Cycle = require('../../models/Cycle');

async function loadUsers() {
	const userIds = users.map(async (user) => {
		setTimeout(async () => {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
				body: JSON.stringify(user),
			}).catch((err) => console.log(err));
			return response.json();
		}, Math.random() * 3000);
	});
	return await Promise.all(userIds);
}
async function setUsers() {
	User.deleteMany()
		.then(async () => {
			console.log('Users Deleted');
			await loadUsers();
			// console.log(await loadUsers());
		})
		.then(console.log)
		.catch(console.error);
	// .finally(process.exit);
}
setUsers();

Tier.deleteMany().catch(console.error);
Item.deleteMany().catch(console.error);
Need.deleteMany().catch(console.error);
Link.deleteMany().catch(console.error);
Cycle.deleteMany().catch(console.error);
