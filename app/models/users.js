var mongoose = require('mongoose'),
		eventSchema = require('./event').schema;
		listSchema = require('./list').schema;

var userSchema = mongoose.Schema({
	userName: { type: String, unique: true },
	firstName: String,
	password: String || Number,
	events: [eventSchema],
  lists: [listSchema]
});

module.exports= mongoose.model('User', userSchema);
