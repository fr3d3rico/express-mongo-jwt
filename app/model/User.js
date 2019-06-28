const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);