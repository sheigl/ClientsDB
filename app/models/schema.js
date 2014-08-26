var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
	clientID: String,
	clientCompanyName: String,
	clientContactFirstName: String,
	clientContactLastName: String,
	clientEmail: String,
	clientAddress: Object,
	clientWorkPhone: String,
	clientMobilePhone: String,
	clientProjects:Array
});

module.exports = mongoose.model('Client', clientSchema);