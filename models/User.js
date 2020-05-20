const mongoose = require('../db/connection');

const UserSchema = new mongoose.Schema({
	email: String,
	userName: String,
	password: String,
	created: { type: Date, default: Date.now },
	cycle: [
		{
			ref: 'Cycle',
			type: mongoose.Schema.Types.ObjectId,
		},
	],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
