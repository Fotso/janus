var mongoose = require('mongoose');
// get our config file
var config = require('./database.js');
 mongoose.Promise = global.Promise; 
// connect to database
mongoose.connect(config.database); 
module.exports = mongoose; 