

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/text2');

console.log("Connection Established");

module.exports = mongoose;




