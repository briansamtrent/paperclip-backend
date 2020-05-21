const userUrl = 'http://localhost:8080/api/user';
const fetch = require('node-fetch');

const Link = require('../../models/Link');

async function confirmLinks(linksArray) {
	const confirmedLinks = await linksArray.map((link) => {
		console.log(link._id);
		setTimeout(() => {
			fetch(`http://localhost:8080/api/link/${link._id}/confirm`, {
				method: 'PATCH',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
				body: JSON.stringify({ confirmation: 1 }),
			}).catch((err) => console.log(err));
		}, Math.random() * 1000 * (linksArray.length / 5));
	});

	return Promise.all(await confirmedLinks);
}

async function kickIt() {
	const links = await fetch('http://localhost:8080/api/link/unconfirmed', {
		method: 'GET',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	}).catch((err) => console.log(err));

	const linksArray = await links.json();

	await confirmLinks(linksArray);
	// setTimeout(() => {
	// 	process.exit();
	// }, 1000 * (linksArray.length / 10));
	// process.exit();
}

kickIt();
