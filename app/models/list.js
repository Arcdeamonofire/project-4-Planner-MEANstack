var mongoose = require('mongoose');


var listSchema = mongoose.Schema({
    user: String,
    body: String,
    post: String

})

var List = mongoose.model('List', listSchema);

module.exports = List;
