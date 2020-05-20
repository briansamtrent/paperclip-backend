const mongoose = require('../db/connection');

const CategorySchema = new mongoose.Schema({
	title: String,
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
