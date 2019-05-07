const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const geoSchema = new Schema({
	type: {
		type: String,
		default: 'Point',
	},
	coordinates: {
		type: [Number],
		index: '2dsphere',
	},
});

// create a ninja schema
const ninjaSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name field is required.'],
	},
	rank: {
		type: String,
		default: 'noob',
	},
	available: {
		type: Boolean,
		default: false,
	},
	// Add location
	geometry: {
		type: geoSchema,
	},
});

const Ninja = mongoose.model('ninja', ninjaSchema);

module.exports = Ninja;
