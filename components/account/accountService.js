const account = require('../auth/userModel');

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

// exports.validateEditProfile = async (id, username, email) =>{
//     let validation = {isValidUsername: true, isValidEmail: true};
//     validation.isValidUsername = await this.validateUsername(id, username);
//     validation.isValidEmail = await this.validateEmail(id, email);
//
//     return validation;
// }

exports.updateProfile = async (id, accountDetail) =>{
    const result = await account.updateOne({ _id: id },
        { $set: {username: accountDetail.username, fullname: accountDetail.fullname,
                phone: accountDetail.phone, address: accountDetail.address, email: accountDetail.email} });

    return result;
}