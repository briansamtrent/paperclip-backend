const Category = require('../../models/Category');
// Require the data
const seedData = require('./categories.json');


Category.deleteMany()
	.then(() => Category.insertMany(seedData))
	.then(console.log)
	.catch(console.error)
	.finally(process.exit);
