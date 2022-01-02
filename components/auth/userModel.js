const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        role: Number,
        isAuthenticated: Boolean,
        activationString: String,
        isLock: Boolean,
        username: String,
        password: String,
        fullname: String,
        email: String,
        phone: String,
        address: String
    }
);

const user = mongoose.model('User', userSchema, 'users');

module.exports = user;