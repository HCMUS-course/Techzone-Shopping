const account = require('../auth/userModel');
const bcrypt = require("bcrypt");

exports.getOneAccount = async (id) =>{
    const user = await account.findById(id).lean();
    return user;
}

exports.validateUsername = async (id, username) =>{
    const user = await account.findOne({username: username, _id: {$ne: id}}).lean();
    if (!user) {
        return true;
    }

    return false;
}

exports.validateEmail = async (id, email) =>{
    const user = await account.findOne({email: email, _id: {$ne: id}}).lean();
    if (!user) {
        return true;
    }

    return false;
}

exports.updateProfile = async (id, accountDetail) =>{
    const result = await account.updateOne({ _id: id },
        { $set: {username: accountDetail.username, fullname: accountDetail.fullname,
                phone: accountDetail.phone, address: accountDetail.address, email: accountDetail.email} });

    return result;
}

exports.confirmPassword = async (password, user) => {
    return bcrypt.compare(password, user.password);
}

exports.updatePassword = async (id, newPassword) =>{
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    const result = await account.updateOne({ _id: id },
        { $set: {password: newPasswordHash} });

    return result;
}