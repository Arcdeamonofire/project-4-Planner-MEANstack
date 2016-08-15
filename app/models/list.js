var mongoose = require('mongoose');


var listSchema = mongoose.Schema({
    name: String,
    entries: []

})

var List = mongoose.model('List', listSchema);

module.exports = List;
