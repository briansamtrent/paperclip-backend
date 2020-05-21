const mongoose = require('../db/connection');

const NeedSchema = new mongoose.Schema({
	category: {
		ref: 'Category',
		type: mongoose.Schema.Types.ObjectId,
		autopopulate: true,
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

NeedSchema.plugin(require('mongoose-autopopulate'));

const Need = mongoose.model('Need', NeedSchema);

module.exports = Need;
