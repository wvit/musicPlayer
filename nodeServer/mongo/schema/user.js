const mongoose = require('mongoose');
const user = new mongoose.Schema({
    nickname: String,
    email: String,
    password: String,
    userId: Number
});

module.exports = mongoose.model('user', user);