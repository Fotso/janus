//company model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// set up a mongoose model
var CompanySchema = new Schema({
	name: String,
	email: {
		type: String,
		required: true
	},
	address:String,
	codePostal:String,
	phone: String,
	website: String,
   	employees: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	events: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Company', CompanySchema);
