const express = require('express');
const router = express.Router();

// import the user model
const User = require('../models/User');
const Tier = require('../models/Tier');

router.get('/:id/tier', (req, res) => {
	Tier.find({ user: req.params.id }).then((tiers) => {
		res.json(tiers);
	});
});

router.get('/:userName/name', (req, res) => {
	const userName = req.params.userName;
	User.findOne({ userName: userName }).then((user) => {
		res.json(user);
	});
});

router.get('/', (req, res) => {
	User.find().then((allUsers) => {
		res.json(allUsers);
	});
});

router.get('/:userId', (req, res) => {
	User.findById(req.params.userId).then((user) => {
		res.json(user);
	});
});

router.post('/', (req, res) => {
	const newUser = req.body;
	User.create(newUser)
		.then((created) => {
			res.json(created);
			return created;
		})
		.then((newUserData) => {
			for (let i = 1; i <= 3; i++) {
				let newTier = { rank: i };
				newTier.user = newUserData._id;
				Tier.create(newTier);
			}
		});
});

module.exports = router;
