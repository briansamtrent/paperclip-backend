const express = require('express');
const router = express.Router();

// import the user model
const User = require('../models/User');
const Tier = require('../models/Tier');

router.get('/:id/tier', (req, res) => {
	Tier.findOne({ user: req.params.id }).then((tiers) => {
		res.json(tiers);
	});
});

router.get('/', (req, res) => {
	User.find().then((allUsers) => {
		res.json(allUsers);
	});
});

router.get('/:userName', (req, res) => {
	const userName = req.params.userName;
	User.findOne({ userName: userName }).then((user) => {
		res.json(user);
	});
});

router.post('/', (req, res) => {
	const newUser = req.body;
	User.create(newUser).then((created) => {
		res.json(created);
	});
});

router.post('/:id/tier', (req, res) => {
	User.findById(req.params.id).then((user) => {
		const newTier = req.body;
		newTier.user = req.params.id;
		Tier.create(newTier).then((created) => {
			res.json(created);
		});
	});
});

router.post('/:id/', (req, res) => {
	const newTier = req.body;
	newTier.user = req.params.id;
	Tier.create(newTier).then((created) => {
		res.json(created);
	});
});

module.exports = router;
