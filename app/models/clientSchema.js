var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
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
