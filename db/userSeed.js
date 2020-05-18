const url = 'http://localhost:8080/api/user';
const users = require('./users.json');
const fetch = require('node-fetch');
const User = require('../models/User');

async function loadUsers() {
	const userIds = users.map(async (user) => {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify(user),
		}).catch((err) => console.log(err));
		return response.json();
	});
	return await Promise.all(userIds);
}
async function setUsers() {
	User.deleteMany()
		.then(async () => {
			console.log('Users Deleted');
			console.log(await loadUsers());
		})
		.then(console.log)
		.catch(console.error)
		.finally(process.exit);
}
setUsers();