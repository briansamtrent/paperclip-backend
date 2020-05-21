const categories = require('./categories.json');
const Category = require('../../models/Category');

// Category.deleteMany().catch(console.error);

Category.insertMany(categories);
