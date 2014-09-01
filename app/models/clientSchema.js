var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
	_creator: Schema.Types.ObjectId,
	clientID: Number,
	clientCompanyName: String,
	clientContactFirstName: String,
	clientContactLastName: String,
	clientEmail: String,
	clientAddress: Object,
	clientWorkPhone: String,
	clientMobilePhone: String,
	// clientProjects
});

module.exports = mongoose.model('Client', clientSchema);
