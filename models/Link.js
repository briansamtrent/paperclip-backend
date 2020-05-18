const mongoose = require('../db/connection');

const LinkSchema = new mongoose.Schema({
	item: {
		ref: 'Item',
		type: mongoose.Schema.Types.ObjectId,
	},
	need: {
		ref: 'Need',
		type: mongoose.Schema.Types.ObjectId,
	},
	confirmed: Number,
});

const Link = mongoose.model('Link', LinkSchema);

module.exports = Link;
