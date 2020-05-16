const mongoose = require('../db/connection');

const NeedSchema = new mongoose.Schema({
	category: { ref: 'Category', type: mongoose.Schema.Types.ObjectId },
	tier: { ref: 'Tier', type: mongoose.Schema.Types.ObjectId },
});

const Need = mongoose.model('Need', NeedSchema);

module.exports = Need;
