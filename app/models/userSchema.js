var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	userFirstName: String,
	userLastName: String,
	userAddress: Object,
	userAvatar: String
});

module.exports = mongoose.model('User', userSchema);