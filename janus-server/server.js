var proxy_port = 8888;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan  = require('morgan');
var passport = require('passport');
var path = require('path');

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// use morgan to log requests to the console
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname,'./public/images')));
//correct the  No 'Access-Control-Allow-Origin' header problem
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	if ('OPTIONS' == req.method){
		return res.sendStatus(200);
	}
	next();
});

// basic apiRoutes
app.get('/', function(req, res) {
	res.status(200).send('Hello! The API is at http://localhost:' + proxy_port);
});
var apiRoutes = require(path.join(__dirname,'./routes/'));
app.use('/api', apiRoutes);

app.listen(proxy_port, function() {
	console.log('Proxy running on ' + proxy_port);
});