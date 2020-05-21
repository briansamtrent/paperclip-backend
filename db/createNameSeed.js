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
	object.userName = line.replace(' ', '');
	object.email = line.replace(' ', '') + '@email.com';
	object.password = 'password';
	console.log(JSON.stringify(object), ',');
});
