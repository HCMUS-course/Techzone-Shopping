const userModel = require('./userModel');

exports.findByUsername = (username) => {
    return userModel.findOne({
        username: username
    }).lean();
}

exports.validPassword = (password, user) => {
    return user.password === password;
}