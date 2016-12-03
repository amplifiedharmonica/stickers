// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var CardSchema   = new mongoose.Schema({
    type: String,
    link: String,
    title: String,
    text: String,
    cardid: Number,
    image: String
});

// Export the Mongoose model
module.exports = mongoose.model('Card', CardSchema);
/**
 * Created by antoremin on 5/3/16.
 */
