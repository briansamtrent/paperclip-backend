const mongoose = require('../db/connection');

const CycleSchema = new mongoose.Schema({
	links: [
		{
			ref: 'Link',
			type: mongoose.Schema.Types.ObjectId,
		},
	],
});

const Cycle = mongoose.model('Cycle', CycleSchema);

module.exports = Cycle;
