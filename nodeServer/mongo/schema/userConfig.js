const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  mainColor: String,
  userId: Number
});