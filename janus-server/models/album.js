var express = require('express');
var mongojs = require('mongojs');
var mongoose    = require('./../config/janus_database_connect');
var Schema = mongoose.Schema;
var EventSchema = require('./event');
var VenueSchema = require('./venue');

// set up a mongoose model
var AlbumSchema = new Schema({
	name: String,
	title: String,
	description: String,
	files: [{
		fieldname: 'String',
		originalname: 'String',
		encoding: 'String',
		mimetype: 'String',
		destination: 'String',
		filename: 'String',
		path: 'String',
		size: 'String',
		created_at: { type: Date, default: Date.now }
	}],
	date: Date, // date of the album
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

AlbumSchema.pre("save",function(next) {
	var album = this;
	if(!album.files)
		album.files = [];
	next();
});

module.exports = mongoose.model('Album', AlbumSchema);