// GET POST PUT events routes
var express = require('express');
var mongojs = require('mongojs');
var mongoose = require('./../config/janus_database_connect');
var db_categories = mongojs('janus', ['categories']);
var db_events = mongojs('janus', ['events']);
var db_venues = mongojs('janus', ['venues']);
var Event = require('./../models/event');
var apiRoutes = express.Router();
var date = new Date();
var jwt = require('jwt-simple');
var passport = require('passport');
var User = require('./../models/user'); 
require('./../config/passport')(passport);
var config = require('./../config/database.js'); 

apiRoutes.get('/events/', function(req, res) {
	db_events.events.find({}, function(err, events) {
		if(err)
			return res.json({success: false, msg: err});
		return res.json(events);
	});
});

apiRoutes.get('/events/:id', function(req, res) {
	var id = req.params.id;
	db_events.events.findOne({_id:mongojs.ObjectId(id)}, function(err, doc){
		if(err)
			return res.json({success: false, msg: err});
		return res.json(doc);
	});
});

apiRoutes.post('/events/', passport.authenticate('jwt', { session: false}), function(req, res) {
	var token = getToken(req.headers);
	if(token){
		var decoded = jwt.decode(token, config.secret);
		User.findOne({
			username: decoded.username
		}, function(err, user) {
			if (err || !user){
				return res.status(403).send({success: false, msg: 'Authentication failed. An error occured.'});
			} else {
				if(user.superAdmin || user.admin){
					if (!req.body.address || !req.body.name) {
						return res.json({success: false, msg: 'Please pass name and address.'});
					} else {
						var newEvent = new Event({	
							name: req.body.name,
							address: req.body.address,
							description: req.body.description,
							date_event: req.body.date_event,
							created_at: date,
							updated_at: date
						});
						newEvent.save(function(err) {
							if (err) {
								return res.json({success: false, msg: err});
							}
							return res.json({success: true, msg: "event successfully created!"});
						});
					}
				}else{
					return res.status(403).send({success: false, msg: 'You don\'t have permission to modify data.'});
				}
			}
		});
	}else{
		return res.status(403).send({success: false, msg: 'No token provided.'});
	}
});

apiRoutes.put('/events/:id', passport.authenticate('jwt', { session: false}), function(req, res){
	var token = getToken(req.headers);
	var id = req.params.id;
	if(token){
		var decoded = jwt.decode(token, config.secret);
		User.findOne({
			username: decoded.username
		}, function(err, user) {
			if (err || !user){
				return res.status(403).send({success: false, msg: 'Authentication failed. An error occured.'});
			} else {
				if(user.superAdmin || user.admin){
					//if the references are not defined, we don't insert them into the collection
					var categorie_id_value , album_id_value, venue_id_value = "";
					if(req.body.categorie_id){
						categorie_id_value = mongojs.ObjectId(String(req.body.categorie_id));
					}
					if(req.body.album_id){
						album_id_value = mongojs.ObjectId(String(req.body.album_id));
					}
					if(req.body.venue_id){
						venue_id_value = mongojs.ObjectId(String(req.body.venue_id));
					}	
					db_events.events.findOne({_id:mongojs.ObjectId(id)}, function(err,doc){
						if(err){
							//if they are an error in our update
							return res.json({success: false, msg: err});
						}
						//we remove the event from the list of the events of this old venue => doc.event_id
						if(doc.venue_id){
							db_venues.venues.update({"events._id": mongojs.ObjectId(id)}, 
								{$pull: {'events': {'_id': mongojs.ObjectId(id)}}});	

							//in any case we push the new value in events list of the venue
							db_venues.venues.update({"_id": mongojs.ObjectId(req.body.venue_id)}, 
								{$push: 
									{'events':  
									{	"_id": mongojs.ObjectId(id),
									"name": req.body.name,
									"address": req.body.address,
									"description": req.body.description,
									"categorie_id": categorie_id_value,
									"album_id": album_id_value,
									"venue_id": venue_id_value,
									"date_event": req.body.date_event,
									"updated_at": date
							}}});				
						}
						// finally we update the new value of the event in the database events
						db_events.events.update({"_id": mongojs.ObjectId(id)},
							{$set: 
								{	
									"name": req.body.name,
									"address": req.body.address,
									"description": req.body.description,
									"categorie_id": categorie_id_value,
									"album_id": album_id_value,
									"venue_id": venue_id_value,
									"date_event": req.body.date_event,
									"updated_at": date
						}});
						return res.json({success: true, msg: "event successfully modified!"});
					});//end of db_events.events.findOne
				}else{
					return res.status(403).send({success: false, msg: 'You don\'t have permission to modify data.'});
				}
			}
		});
	}else{
		return res.status(403).send({success: false, msg: 'No token provided.'});
	}
});//end of put('/events/:id')

apiRoutes.delete('/events/:id', passport.authenticate('jwt', { session: false}), function(req, res){
	var token = getToken(req.headers);
	if(token){
		var decoded = jwt.decode(token, config.secret);
		User.findOne({
			username: decoded.username
		}, function(err, user) {
			if (err || !user){
				return res.status(403).send({success: false, msg: 'Authentication failed. An error occured.'});
			} else {
				if(user.superAdmin || user.admin){
					var id = req.params.id;
					//if we delete an event, we delete as well his album
					db_venues.venues.update({"events._id": mongojs.ObjectId(id)}, 
						{$pull: {'events': {'_id': mongojs.ObjectId(id)}}});	
					db_events.events.remove({_id:mongojs.ObjectId(id)}, function(err,doc){
						if(err)
							return res.json({success: false, msg: err});
						return res.json(doc);
					});
				}else{
					return res.status(403).send({success: false, msg: 'You don\'t have permission to modify data.'});
				}
			}
		});
	}else{
		return res.status(403).send({success: false, msg: 'No token provided.'});
	}
});

module.exports = apiRoutes;
	