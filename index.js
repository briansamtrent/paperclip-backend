const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userController = require('./controllers/userController');
app.use('/api/user', userController);

const categoryController = require('./controllers/categoryController');
app.use('/api/category', categoryController);

const itemController = require('./controllers/itemController');
app.use('/api/item', itemController);

const needController = require('./controllers/needController');
app.use('/api/need', needController);

const tierController = require('./controllers/tierController');
app.use('/api/tier', tierController);

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
