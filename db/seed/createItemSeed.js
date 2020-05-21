let fs = require('fs');
let path = require('path');
const fetch = require('node-fetch');

const readLine = require('readline');

async function creator() {
	const catsResponse = await fetch(
		'http://localhost:8080/api/category'
	).catch((err) => console.log(err));

	cats = await catsResponse.json();

	let catsLength = cats.length;

	const readInterface = readLine.createInterface({
		input: fs.createReadStream(path.join(__dirname, '/namesList.txt')),
		output: false,
		console: false,
	});

	readInterface.on('line', function (line) {
		let object = {};
		let randomCat;
		for (let i = 1; i <= 3; i++) {
			setTimeout(() => {
				object.userName = line.replace(' ', '');
				object.rank = Math.floor(Math.random() * 3) + 1;
				randomCat = Math.floor(Math.random() * catsLength);
				category = cats[randomCat].title;
				object.category = category;
				object.picture = 'pic';
				object.description = 'great ' + category;
				console.log(JSON.stringify(object), ',');
			}, Math.random() * 10);
		}
	});
}

creator();
