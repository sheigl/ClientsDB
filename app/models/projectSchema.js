var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
	_creator: Schema.Types.ObjectId,
	projectName: String,
	projectStatus: String
});

module.exports = mongoose.model('Project', projectSchema);