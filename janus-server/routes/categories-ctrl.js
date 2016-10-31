// GET POST PUT categories routes
var express = require('express');
var mongojs = require('mongojs');
var mongoose    = require('./../config/janus_database_connect');
var db_categories = mongojs('janus', ['categories']);
var Categorie = require('./../models/categorie');
var apiRoutes = express.Router();

apiRoutes.get('/categories/', function(req, res) {
	db_categories.categories.find({}, function(err, categories) {
		if(err)
			return res.json({success: false, msg: err});
		res.json(categories);
	});
});

apiRoutes.put('/categories/:id',function(req, res){
	var id = req.params.id;
	db_categories.categories.update(
			{"_id": mongojs.ObjectId(id)},
				{$set: 
					{	"event_type": req.body.event_type
					}
	});
	res.json({success: true, msg: "update sucessfull"});
});
apiRoutes.post('/categories/', function(req, res) {
	var newCategorie = new Categorie({
		event_type: req.body.event_type,
	});	
	newCategorie.save(function(err) {
		if(err)
			return res.json({success: false, msg: err});
		res.json({success: true, msg: "categorie added"});
	});
});

apiRoutes.delete('/categories/:id', function(req, res){
	var id = req.params.id;
	db_categories.categories.remove({_id:mongojs.ObjectId(id)}, function(err,doc){
		if(err)
			return res.json({success: false, msg: err});
		res.json(doc);
	});
});
 
apiRoutes.get('/categories/:id', function(req, res){
	var id = req.params.id;
	db_categories.categories.findOne({_id:mongojs.ObjectId(id)}, function(err,doc){
		if(err)
			return res.json({success: false, msg: err});
		res.json(doc);
	});
});



	module.exports = apiRoutes;