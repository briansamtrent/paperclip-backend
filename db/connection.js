const mongoose = require('mongoose');

const mongoURI =
	process.env.NODE_ENV === 'production'
		? process.env.MONGODB_URI
		: 'mongodb+srv://Paperclip:7Ngbw44ChZhYbxOw@paperclip-ubfh6.mongodb.net/paperclip?retryWrites=true&w=majority';

mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then((instance) =>
		console.log(`Connected to db: ${instance.connections[0].name}`)
	)
	.catch((error) => console.log('Connection failed!', error));

module.exports = mongoose;
