var express = require('express');
var mongojs = require('mongojs');
var mongoose    = require('./../config/janus_database_connect');
var Schema = mongoose.Schema;
var EventSchema = require('./event');
var AlbumSchema = require('./album');

// set up a mongoose model
var VenueSchema = new Schema({
	name: String,
	email: {
		type: String,
		required: true
	},
	address:String,
	codePostal:String,
	phone: String,
	website: String,
	events: [EventSchema],
	album_id:{ type: Schema.Types.ObjectId, ref: 'Album' },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Venue', VenueSchema);
