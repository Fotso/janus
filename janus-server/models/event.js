var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CategorieSchema = require('./categorie');
var AlbumSchema = require('./album');
// set up a mongoose model
var EventSchema = new Schema({
	name: String,	
	address: String,
	categorie_id: { type: Schema.Types.ObjectId, ref: 'Categorie' },
	description: String,
	album_id:{ type: Schema.Types.ObjectId, ref: 'Album'  },
	venue_id:{ type: Schema.Types.ObjectId, ref: 'Venue' },
	date_event: Date,
	location : [],
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

EventSchema.pre('save', function(next) {
  // we check the event location by doing a request to Google Map API
  if(this.adress!=null){
  	var address = this.address.split(" ").join("+");
  	var loc = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyCm5ycPtJcNfae4SkmAhMNo2BzOf5Zpvso';
  	console.log(location);
  	if(this.location!=null){

  	}else{
  		//this.location
  	}
  } 
  next();
});

module.exports = mongoose.model('Event', EventSchema);