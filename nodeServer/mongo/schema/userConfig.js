const mongoose = require('mongoose');
const userConfig = new mongoose.Schema({
  mainColor: String,
  userId: Number
});

module.exports = mongoose.model('config', userConfig);