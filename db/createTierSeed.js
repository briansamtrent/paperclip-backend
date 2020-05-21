let fs = require('fs');
let path = require('path');

const readLine = require('readline');

const readInterface = readLine.createInterface({
	input: fs.createReadStream(path.join(__dirname, '/namesList.txt')),
	output: false,
	console: false,
});

readInterface.on('line', function (line) {
	let object = {};
	for (let i = 1; i <= 3; i++) {
		object.userName = line.replace(' ', '');
		object.rank = i;
		console.log(JSON.stringify(object), ',');
	}
});
