const Need = require('../models/Need');
const Item = require('../models/Item');

// create a mongo query that links items to needs by category id

async function getLinks() {
	const links = await Need.aggregate([
		{
			$lookup: {
				from: 'Item',
				localField: 'category',
				foreignField: 'category',
				as: 'link',
			},
		},
	]);
	console.log(await links);
	return Promise.all(await links);
}

console.log(getLinks());

// { '$lookup': {
//   'from': AuditTask.collection.name,
//   'localField': '_id',
//   'foreignField': 'checklist_id',
//   'as': 'TaskData'
// }}
