// GET POST PUT DELETE photos routes
var express = require('express');
var mongojs = require('mongojs');
var mongoose    = require('./../config/janus_database_connect');
var db_venues = mongojs('janus', ['venues']);
var Venue = require('./../models/venue');
var apiRoutes = express.Router();
var date = new Date();
var jwt  = require('jwt-simple');
var passport = require('passport');
var User = require('./../models/user'); 
require('./../config/passport')(passport);
var config = require('./../config/database.js'); 

apiRoutes.get('/venues', function(req, res) {
	db_venues.venues.find({}, function(err, venues) {
		res.json(venues);
	});
});

apiRoutes.get('/venues/:id', function(req, res){
  var id = req.params.id;
  db_venues.venues.findOne({_id:mongojs.ObjectId(id)}, function(err,doc){
    if(err)
      return res.json({success: false, msg: err});
    res.json(doc);
  });
});

apiRoutes.put('/venues/:id', passport.authenticate('jwt', { session: false}), function(req, res){
  var token = getToken(req.headers);
  if(token){
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      username: decoded.username
    }, function(err, user) {
      if (err || !user){
        return res.status(403).send({success: false, msg: 'Authentication failed. An error occured.'});
      } else {
        if(user.superAdmin){
          var id = req.params.id;
          db_venues.venues.findAndModify({
            query: {_id: mongojs.ObjectId(id)},
            update: {
              $set: {
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                codePostal: req.body.codePostal,
                city: req.body.city,
                phone: req.body.phone,
                website: req.body.website,
                album_id: req.body.album_id,
                updated_at: date
              }
            },
            new: true
          }, 
          function (err, doc) {res.json(doc);}); 
        }else{
          return res.status(403).send({success: false, msg: 'You don\'t have permission to modify data.'});
        }
      }
    });
  }else{
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});


apiRoutes.post('/venues', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if(token){
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      username: decoded.username
    }, function(err, user) {
      if (err || !user){
        return res.status(403).send({success: false, msg: 'Authentication failed. An error occured.'});
      } else {
          if (!req.body.email) {
            res.json({success: false, msg: 'Please pass email address.'});
          } else {
            if(user.superAdmin){
              // we create our object company
              var newVenue = new Venue({  
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                codePostal: req.body.codePostal,
                city: req.body.city,
                phone: req.body.phone,
                website: req.body.website,
                created_at: date,
                updated_at: date
              });
              newVenue.save(function(err) {
                if (err) {
                  return res.json({success: false, msg: err});
                }
                return res.json({success: true, msg: "company successfully added!"});
              });          
            }else{
              return res.status(403).send({success: false, msg: 'You don\'t have permission to modify data.'});
            }
          }
      }
    });
  }else{
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});


apiRoutes.delete('/venues/:id', passport.authenticate('jwt', { session: false}), function(req, res){
  var token = getToken(req.headers);
  if(token){
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      username: decoded.username
    }, function(err, user) {
      if (err || !user){
        return res.status(403).send({success: false, msg: 'Authentication failed. An error occured.'});
      } else {
        if(user.superAdmin){
          var id = req.params.id;
          db_venues.venues.remove({_id:mongojs.ObjectId(id)}, function(err,doc){
            if(err)
              return res.json({success: false, msg: err});
            res.json(doc);
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