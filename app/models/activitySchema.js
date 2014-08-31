var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
	_creator: Schema.Types.ObjectId,
	_project: Schema.Types.ObjectId,
	activityName: String,
	activityCategory: String,
	activityStartTime: Number,
	activityEndTime: Number,
	activityTotalTime: Number,
	activityRate: Number,
	activityTotal: Number
});

module.exports = mongoose.model('Activity', activitySchema);