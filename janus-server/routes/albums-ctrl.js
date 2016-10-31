// GET POST PUT DELETE photos routes
var express = require('express');
var mongojs = require('mongojs');
var mongoose    = require('./../config/janus_database_connect');
var db_albums = mongojs('janus', ['albums']);
var Album = require('./../models/album');
var apiRoutes = express.Router();
var multer = require ('multer');
var path = require('path');
var crypto = require('crypto');
var bodyParser = require('body-parser');

apiRoutes.use(bodyParser.json({limit: '10mb'}));
apiRoutes.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
//we define the maximum file size limit (10MB)
var maxSize = 10 * 1000 * 1000;
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
  	//console.log("ini");
    callback(null, path.join(__dirname,'./../public/images'));
  },
  filename: function (req, file, cb) {
    //because multer transform the image to file encode it. So we need to 
    //decode it in order to have the "original image"
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
});
//we can upload in the same time 10 files
//we accept jpg jpeg png ang gif formats
//the file size maximum is 10MB
var upload = multer({ 
  storage : storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
  if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg'
      && file.mimetype !== 'image/png' && file.mimetype !== 'image/gif') {
    req.fileValidationError = 'Image mimetype is not valid!';
    return cb(null, false, new Error('Image mimetype is not valid!'));
  }
    cb(null, true);
  }
}).array('files'); //we abondoned the 10 files maximum because the server crash
//when multiple error occured https://github.com/expressjs/multer/issues/335

//display the image in the browser
apiRoutes.get('/file/:name', function (req, res, next) {
  var options = {
    root: path.join(__dirname,'./../public/images'),
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
 // console.log(req);
  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
   //   console.log(err);
      res.status(err.status).end();
    }
    else {
     // console.log('Sent:', fileName);
    }
  });
});

apiRoutes.get('/albums', function(req, res) {
	db_albums.albums.find({}, function(err, albums) {
		res.json(albums);
	});
});

apiRoutes.post('/albums', function(req, res) {
	if (!req.body.name || !req.body.date ) {
		res.json({success: false, msg: 'Please pass album name and date.'});
	} else {
		var date = new Date();
		var album = new Album({
			name: req.body.name,
			title: req.body.title,
			description: req.body.description,
			date: req.body.date,
			created_at: date,
			updated_at: date
		});
		album.save(function(err) {
	  		if (err) {
	  			return res.json({success: false, msg: err});
	  		}
	  		res.json({success: true, msg: 'New album successfuly created.'});	
		});
	}
});

apiRoutes.post('/albums/:id',function(req,res){
	var id = req.params.id;
    upload(req,res,function(err) {
    //	console.log(req.files);
    	if(err) {
      		return res.end("Error uploading file. "+err);
      	}
      	if(req.fileValidationError){
        	return res.end("Error uploading file. The file mimetype is incorrect");
      	}
      db_albums.albums.update( {_id:mongojs.ObjectId(id)}, {"$push" : {files :{"$each":req.files}} })
    	return res.json({error_code:0,err_desc:null});
    });
});

apiRoutes.get('/albums/:id', function(req, res){
	var id = req.params.id;
	//console.log(id);
	db_albums.albums.findOne({_id:mongojs.ObjectId(id)}, function(err,doc){
		if(err)
			return res.json({success: false, msg: err});
		res.json(doc);
	});
});


apiRoutes.delete('/albums/:id', function(req, res){
  var id = req.params.id;
  db_albums.albums.remove({_id:mongojs.ObjectId(id)}, function(err,doc){
    if(err)
      return res.json({success: false, msg: err});
    res.json(doc);
  });
});

apiRoutes.post('/albums/files/:id', function(req, res){
	var id = req.params.id;
  var filename_array = [];
  var suc = false;
  var messsage = "";
  //we take the fieldname for each element of the array
  req.body.forEach(function (element, index, array){
   // console.log('{"filename":' + '"'+element.filename+'"'+'}');
    filename_array.push(element.filename);
  });
 // console.log(filename_array.toString());
  //we remove the photo from our album photo
  db_albums.albums.update({"_id": mongojs.ObjectId(id)}, 
    {$pull: {'files': {"filename":{$in: filename_array}}}},
    {multi:true},
    function(err,doc){
      if(err){
        messsage = err;       
      }
      else{
        msg = doc;
        messsage = true;       
      }
  }); 
  return res.json({success: suc, msg : messsage});
});

apiRoutes.put('/albums/:id',function(req, res){
	var id = req.params.id;
	var date = new Date();
	db_albums.albums.findAndModify({
		query: {_id: mongojs.ObjectId(id)},
		update: {
				$set: {
					name: req.body.name,
					title: req.body.title,
					description: req.body.description,
					date: req.body.date,
					updated_at: date
					}
				},
		new: true
	}, 
	function (err, doc) {res.json(doc);});
});
module.exports = apiRoutes;