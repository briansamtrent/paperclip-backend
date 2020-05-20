const mongoose = require('../db/connection');

const ItemSchema = new mongoose.Schema({
	picture: String,
	description: String,
	category: {
		ref: 'Category',
		type: mongoose.Schema.Types.ObjectId,
	},
	tier: {
		ref: 'Tier',
		type: mongoose.Schema.Types.ObjectId,
		autopopulate: true,
	},
	cycle: {
		ref: 'Cycle',
		type: mongoose.Schema.Types.ObjectId,
	},
});
ItemSchema.plugin(require('mongoose-autopopulate'));

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
