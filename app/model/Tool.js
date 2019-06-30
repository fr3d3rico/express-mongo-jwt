const mongoose = require('mongoose');

var toolSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: String,
    link: String,
    description: String,
    tags: Array
});

module.exports = mongoose.model('Tools', toolSchema);