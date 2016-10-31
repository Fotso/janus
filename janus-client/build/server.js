//our servers for the web applications
//tutoriel webpack grafikart https://www.youtube.com/watch?v=WG5IFCZxDO4&spfreload=10
//tutoriel authentication https://devdactic.com/restful-api-user-authentication-1/ https://devdactic.com/user-auth-angularjs-ionic/
var webpack = require('webpack');
var config = require('./../webpack.config.js');
var webpackDevServer = require('webpack-dev-server');
var proxy_port = 8888;
var webpack_dev_port = process.env.PORT || 8080;
/******************our proxy***************************/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan  = require('morgan');
app.use(bodyParser.json());
var server = new webpackDevServer(webpack(config),{
	hot:true,
	contentBase:'./',
	quiet:false,
	noInfo:false,
	publicPath:config.output.publicPath,
	stats: {colors: true},
	headers: { 'Access-Control-Allow-Origin': '*' },
	/*proxy: {
     	'**': "http://localhost:8888"
   	}*/
});

server.listen(webpack_dev_port, 'localhost', function(err){
	if(err){
		console.log(err);
	}else{
		console.log("Listening at localhost "+webpack_dev_port);
	}
});