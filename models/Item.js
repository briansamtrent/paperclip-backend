const mongoose = require('../db/connection');

const ItemSchema = new mongoose.Schema({
	picture: String,
	description: String,
	category: { ref: 'Category', type: mongoose.Schema.Types.ObjectId },
	tier: { ref: 'Tier', type: mongoose.Schema.Types.ObjectId },
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
