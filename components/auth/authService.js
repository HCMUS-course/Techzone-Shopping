const bcrypt = require('bcrypt');
const randomstring = require('randomstring');

const userModel = require('./userModel');
const sgMail = require('../../services/sendGrid');
const account = require("../auth/userModel");

exports.findByUsername = (username) => {
    return userModel.findOne({
        username: username
    }).lean();
}

exports.findByEmail = (email) => {
    return userModel.findOne({
        email: email
    }).lean();
}

exports.validPassword = (password, user) => {
    return bcrypt.compare(password, user.password);
}

exports.register = async (username, email, password) => {
    const passwordHash = await bcrypt.hash(password, 10);
    const activationString = randomstring.generate();
    const user = await userModel.create({
        role: 1,
        isLock: false,
        isAuthenticated: false,
        activationString,
        username: username,
        password: passwordHash,
        email: email,
        fullname: "",
        phone: "",
        address: "",
        resetToken: randomstring.generate(),
    });

    // Send activation string to user email
    const msg = {
        to: email,
        from: process.env.EMAIL_SENDER,
        subject: 'TATechzones account email activation',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<h1>Thanks for register your account with TATechzones</h1>
<p>Please activate your account <a href="${process.env.DOMAIN_NAME}/activate?email=${email}&activation-string=${activationString}">Activate now</a></p>`
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })

    return user;
}

exports.validateEmailAccessibility=async(email)=>{

    return userModel.findOne({email: email}).then(function(result){
         return result === null;
    });
}

exports.validateUsernameAccessibility=async(username)=>{

    return userModel.findOne({username: username}).then(function(result){
         return result === null;
    });
}

exports.getAuthenticationState = async (user) => {
    return user.isAuthenticated;
}

exports.isLock = async (user) => {
    return user.isLock;
}

exports.activate = async (email, activationString) =>{
    const account = userModel.findOne({
        email,
        activationString,
    }).lean();
    if (!account) {
        return false;
    }
    await userModel.updateOne({
        email,
    },{
        $set: {
            isAuthenticated: true,
        },
    });
    return true;
}

exports.sendPasswordResetLink = async (email) => {
    const token = randomstring.generate();
    const result = await account.updateOne({ email: email },
        { $set: {resetToken: token} });

    // Send activation string to user email
    const msg = {
        to: email,
        from: process.env.EMAIL_SENDER,
        subject: 'TATechzones reset password token',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<h1>Reset password</h1>
<p>Hi, you recently requested to reset your password for your tatechzones account. 
Click <a href="${process.env.DOMAIN_NAME}/reset-password?email=${email}&reset-token=${token}">Reset password</a> to reset your password.</p>`
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}

exports.verifyResetToken = async (email, resetToken) =>{
    const account = userModel.findOne({
        email,
        resetToken,
    }).lean();
    if (!account) {
        return false;
    }
    return true;
}

exports.resetPassword = async (email, password) => {
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await account.updateOne({email: email},
        {$set: {password: passwordHash}});
}