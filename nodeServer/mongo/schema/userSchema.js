const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    nickname: String,
    email: String,
    password: String,
    userId: Number
});

module.exports = mongoose.model('user', userSchema);