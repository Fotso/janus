// GET POST PUT users routes
var express = require('express');
var mongojs = require('mongojs');
var mongoose = require('./../config/janus_database_connect');
var morgan = require('morgan');
var db = mongojs('janus', ['users']);
var db_companies = mongojs('janus', ['companies']);	
var jwt = require('jwt-simple');
var passport = require('passport');
require('./../config/passport')(passport);
var config = require('./../config/database.js'); // get our config file
var User = require('./../models/user'); // get our mongoose model
var bcrypt = require('bcrypt');
// configuration 
var apiRoutes = express.Router();

// route to return all users 
apiRoutes.post('/users', passport.authenticate('jwt', { session: false}), function(req, res) {
	var token = getToken(req.headers);
	if (token) {
		var decoded = jwt.decode(token, config.secret);
		User.findOne({
			username: decoded.username
		}, function(err, user) {
			if (err || !user){
				return res.status(403).send({success: false, msg: 'Authentication failed. An error occured.'});
			} else {
	        	//only if the user is a superAdmin or an admin
	        	if(user.superAdmin || user.admin){
	        		//we analysed the request and we processing of the data
	        		if (!req.body.username || !req.body.password || !req.body.email) {
	        			return res.json({success: false, msg: 'Please pass username, email and password.'});
	        		} else {
	        			var newUser = new User({
	        				username: req.body.username,
	        				email: req.body.email,
	        				password: req.body.password,
	        				firstname: req.body.firstname,
	        				lastname: req.body.lastname,
	        				admin:req.body.admin,
	        				superadmin:req.body.superAdmin,
	        			});
	        			newUser.save(function(err) {
	        				if (err) {
	        					return res.json({success: false, msg: err});
	        				}
	        				return res.json({success: true, msg: 'Successful created new user.'});
	        			});
	        		}     		
	        	} else {
	        		return res.status(403).send({success: false, msg: 'You don\'t have permission to access data.'});
	        	}
	        }
	    });
	} else {
		return res.status(403).send({success: false, msg: 'No token provided.'});
	}
});

apiRoutes.post('/user-registration', function(req, res) {
	if (!req.body.username || !req.body.password || !req.body.email) {
		return res.json({success: false, msg: 'Please pass username, email and password.'});
	} else {
		var newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		});
		newUser.save(function(err) {
			if (err) {
				return res.json({success: false, msg: err});
			}
			return res.json({success: true, msg: 'Successful created new user.'});
		});
	}
});

// route to return all users 
apiRoutes.get('/users', passport.authenticate('jwt', { session: false}), function(req, res) {
	var token = getToken(req.headers);
	if (token) {
		var decoded = jwt.decode(token, config.secret);
		User.findOne({
			username: decoded.username
		}, function(err, user) {
			if (err || !user){
				return res.status(403).send({success: false, msg: 'Authentication failed. An error occured.'});
			} else {
				if(user.superAdmin){
					db.users.find({}, function(err, users) {
						if (err) {
							res.json({success: false, msg: err});
						}
						res.json(users);
					});     		
				} else if(user.admin) {
					db.users.find({company_id:mongojs.ObjectId(String(user.company_id))}, function(err, users) {
						if (err) {
							res.json({success: false, msg: err});
						}
						res.json(users);
					}); 
				} else {
					return res.status(403).send({success: false, msg: 'You don\'t have permission to access data.'});
				}
			}
		});
	} else {
		return res.status(403).send({success: false, msg: 'No token provided.'});
	}
});

apiRoutes.delete('/users/:id', passport.authenticate('jwt', { session: false}) , function(req, res){
	if (token) {
		var decoded = jwt.decode(token, config.secret);
		User.findOne({
			username: decoded.username
		}, function(err, user) {
			if (err || !user){
				return res.status(403).send({success: false, msg: 'Authentication failed. An error occured.'});
			} else {
				var id = req.params.id;
				if(user.superAdmin){
					//if the user have a company_id, the remove the user from the employees list of the company
					//then we remove the user
					db_companies.companies.update({"employees._id": mongojs.ObjectId(id)}, 
						{$pull: {'employees': {'_id': mongojs.ObjectId(id)}}});	
					db.users.remove({_id:mongojs.ObjectId(id)}, function(err,doc){
						res.json(doc);
					});   		
				} else if(user.admin){
					db.users.findOne({_id:mongojs.ObjectId(id)}, function(err,user_want_delete){
						if(!user_want_delete.superAdmin && user_want_delete.company_id == user.company_id){
							db_companies.companies.update({"employees._id": mongojs.ObjectId(id)}, 
								{$pull: {'employees': {'_id': mongojs.ObjectId(id)}}});	
							db.users.remove({_id:mongojs.ObjectId(id)}, function(err,doc){
								res.json(doc);
							});
						}else{
							return res.status(403).send({success: false, msg: 'You don\'t have permission to modify data.'});
						}
					});
				} else{
					return res.status(403).send({success: false, msg: 'You don\'t have permission to modify data.'});
				}
			}
		});
	} else {
		return res.status(403).send({success: false, msg: 'No token provided.'});
	}
});

apiRoutes.get('/users/:id', passport.authenticate('jwt', { session: false}) , function(req, res){
	var token = getToken(req.headers);
	if (token) {
		var decoded = jwt.decode(token, config.secret);
		User.findOne({
			username: decoded.username
		}, function(err, user) {
			if (err || !user){
				return res.status(403).send({success: false, msg: 'Authentication failed. An error occured.'});
			} else {
				var id = req.params.id;
				db.users.findOne({_id:mongojs.ObjectId(id)}, function(err,doc){
					if (err) {
						return res.json({success: false, msg: err});
					}
					if(user.superAdmin){
						return res.json(doc);
					}else if(user.admin){
						if(!doc.superAdmin && doc.company_id == user.company_id){
							return res.json(doc);
						}else{
							return res.status(403).send({success: false, msg: 'You don\'t have permission to access data.'});
						}
					}else{
						return res.status(403).send({success: false, msg: 'You don\'t have permission to access data.'});
					}
				});
			}
		});
	} else {
		return res.status(403).send({success: false, msg: 'No token provided.'});
	}
});

apiRoutes.put('/users/:id', passport.authenticate('jwt', { session: false}), function(req, res){  	
	var token = getToken(req.headers);
	if (token) {
		var decoded = jwt.decode(token, config.secret);
		User.findOne({
			username: decoded.username
		}, function(err, user) {
			if (err || !user){
				return res.status(403).send({success: false, msg: 'Authentication failed. An error occured.'});
			} else {
				var id = req.params.id;
				var company_id_value = "";
				if(req.body.company_id){
					company_id_value = mongojs.ObjectId(String(req.body.company_id));
				}	
				if(user.superAdmin){
					db.users.findOne({_id:mongojs.ObjectId(id)}, function(err,doc){
						if(err)
							return res.json({success: false, msg: err});
						//we remove the user from the list of the employees of this old company => doc.company_id
						if(doc.company_id){
							db_companies.companies.update({"employees._id": mongojs.ObjectId(id)}, 
								{$pull: {'employees': {'_id': mongojs.ObjectId(id)}}});			
							//we add the user in the new employees list of this new company => req.body.company_id
							db_companies.companies.update({"_id": mongojs.ObjectId(req.body.company_id)}, 
								{$push: 
									{'employees':  
									{	"_id": mongojs.ObjectId(id),
									"username": req.body.username,
									"email": req.body.email,
									"password": req.body.password,
									"firstname": req.body.firstname,
									"lastname": req.body.lastname,
									"company_id": company_id_value,
									"admin": req.body.admin,
									"superadmin": req.body.superAdmin
								}}
							});		
						}	
						// finally we update the new value of the user in the database users
						//so we just update this new informations
						db.users.update(
							{"_id": mongojs.ObjectId(id)},
							{$set: 
								{	"username": req.body.username, 
								"password": req.body.password, 
								"email": req.body.email, 
								"firstname": req.body.firstname, 
								"lastname": req.body.lastname, 
								"admin": req.body.admin, 
								"company_id": company_id_value, 
								"superAdmin": req.body.superAdmin, 
								"created_at": req.body.created_at, 
								"updated_at": req.body.updated_at
							}
						});//end of db.users.update
						return res.json({success: true, msg: "company successfully added!"});
					});//end of db.users.findOne
				}else if(user.admin){
					db.users.findOne({_id:mongojs.ObjectId(id)}, function(err,doc){
						if(err)
							return res.json({success: false, msg: err});
						if(!doc.superAdmin && doc.company_id == user.company_id){						
							if(doc.company_id){
								db_companies.companies.update({"employees._id": mongojs.ObjectId(id)}, 
									{$pull: {'employees': {'_id': mongojs.ObjectId(id)}}});			
								db_companies.companies.update({"_id": mongojs.ObjectId(req.body.company_id)}, 
									{$push: 
										{'employees':  
										{	"_id": mongojs.ObjectId(id),
										"username": req.body.username,
										"email": req.body.email,
										"password": req.body.password,
										"firstname": req.body.firstname,
										"lastname": req.body.lastname,
										"company_id": company_id_value,
										"admin": req.body.admin,
										"superadmin": req.body.superAdmin
									}}
								});		
							}	
							db.users.update(
								{"_id": mongojs.ObjectId(id)},
								{$set: 
									{	"username": req.body.username, 
									"password": req.body.password, 
									"email": req.body.email, 
									"firstname": req.body.firstname, 
									"lastname": req.body.lastname, 
									"admin": req.body.admin, 
									"company_id": company_id_value, 
									"superAdmin": req.body.superAdmin, 
									"created_at": req.body.created_at, 
									"updated_at": req.body.updated_at
								}});//end of db.users.update
							return res.json({success: true, msg: "company successfully added!"});
						}else{
							return res.status(403).send({success: false, msg: 'You don\'t have permission to modify data.'});
						}
					});//end of db.users.findOne
				}else{
					return res.status(403).send({success: false, msg: 'You don\'t have permission to modify data.'});
				}
		}});
	} else {
		return res.status(403).send({success: false, msg: 'No token provided.'});
	}
});//end of put('/users/:id')

// route to authenticate a user 
apiRoutes.post('/authenticate', function(req, res) {
	db.users.findOne({
		username: req.body.username
	}, function(err, user) {
		if (!user) {
			res.send({success: false, msg: 'Authentication failed. User not found.'});
		} else {
	      	// check if password matches
	      	bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
	      		if (isMatch && !err) {
	          		// if user is found and password is right create a token
	          		var token = jwt.encode(user, config.secret);
	          		// return the information including token as JSON
	          		res.json({success: true, token: 'JWT ' + token, admin: user.admin, superadmin: user.superAdmin, username: user.username});
	          	} else {
	          		res.send({success: false, msg: 'Authentication failed. Wrong password.'});
	          	}
	          });
	      }
	  });
});

getToken = function (headers) {
	if (headers && headers.authorization) {
		var parted = headers.authorization.split(' ');
		if (parted.length === 2) {
			return parted[1];
		} else {
			return null;
		}
	} else {
		return null;
	}
};

module.exports = apiRoutes;