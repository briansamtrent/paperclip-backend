const mongoose = require('../db/connection');

const TierSchema = new mongoose.Schema({
	rank: Number,
	user: {
		ref: 'User',
		type: mongoose.Schema.Types.ObjectId,
	},
});

const Tier = mongoose.model('Tier', TierSchema);

module.exports = Tier;
