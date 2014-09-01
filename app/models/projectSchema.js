var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
	_creator: Schema.Types.ObjectId,
	_client: Schema.Types.ObjectId,
	projectName: String,
	projectStatus: String,
	projectDue: Date,
	projectStartDate: Date,
	projectCompletedDate: Date,
	projectNotes: Array
});

module.exports = mongoose.model('Project', projectSchema);