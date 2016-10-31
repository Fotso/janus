// GET POST PUT companies routes
var express = require('express');
var mongojs = require('mongojs');
var mongoose    = require('./../config/janus_database_connect');
var db_companies = mongojs('janus', ['companies']);
var db = mongojs('janus', ['users']);
var Company = require('./../models/company'); // get our mongoose model
var User   = require('./../models/user'); // get our mongoose model
var jwt         = require('jwt-simple');
var passport = require('passport');
var User   = require('./../models/user'); 
require('./../config/passport')(passport);
var config = require('./../config/database.js'); 
var apiRoutes = express.Router();

apiRoutes.get('/companies', passport.authenticate('jwt', { session: false}), function(req, res) {
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
					db_companies.companies.find({}, function(err, companies) {
						res.json(companies);
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
 
apiRoutes.get('/companies/:id', passport.authenticate('jwt', { session: false}), function(req, res){
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
				if(user.superAdmin || (user.admin && user.company_id == id)){
					db_companies.companies.findOne({_id:mongojs.ObjectId(id)}, function(err,doc){
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

apiRoutes.delete('/companies/:id', passport.authenticate('jwt', { session: false}), function(req, res){
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
				if(user.superAdmin || (user.admin && user.company_id == id)){
					db.users.update({"employees._id": mongojs.ObjectId(id)}, {$set: {'employees': {'_id': null}}});
					db_companies.companies.remove({_id:mongojs.ObjectId(id)}, function(err,doc){
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

apiRoutes.put('/companies/:id', passport.authenticate('jwt', { session: false}), function(req, res){
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
				if(user.superAdmin || (user.admin && user.company_id == id)){
						db_companies.companies.findAndModify({
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
										updated_at: req.body.updated_at
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

// route to register a user (POST http://localhost:8080/api/companies)
apiRoutes.post('/companies', passport.authenticate('jwt', { session: false}), function(req, res) {
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
					if (!req.body.email) {
						res.json({success: false, msg: 'Please pass email address.'});
					} else {
						// we create our object company
						var newCompany = new Company({	
							name: req.body.name,
							email: req.body.email,
							address: req.body.address,
							codePostal: req.body.codePostal,
							city: req.body.city,
							phone: req.body.phone,
							website: req.body.website,
							created_at: req.body.created_at,
							updated_at: req.body.updated_at
						});
						newCompany.save(function(err) {
							if (err) {
								return res.json({success: false, msg: err});
							}
							return res.json({success: true, msg: "company successfully added!"});
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

module.exports = apiRoutes;