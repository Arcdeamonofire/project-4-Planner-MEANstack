var mongoose = require('mongoose');


var eventSchema = mongoose.Schema({
    date: String,
    description: String

})

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
