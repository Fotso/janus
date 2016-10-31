var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorieSchema = new Schema({
	event_type: String,
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Categorie', CategorieSchema);