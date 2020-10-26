const mongoose = require('mongoose');

var statusSchema = new mongoose.Schema({
    username:String,
    title: String,
    posts: String,
    time:{ type : Date, default: Date.now }
   
});




var Userpost = mongoose.model('Userpost', statusSchema);
module.exports = Userpost;