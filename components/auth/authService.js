const bcrypt = require('bcrypt');
const randomstring = require('randomstring');

const userModel = require('./userModel');
const sgMail = require('../../services/sendGrid');

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
        address: ""
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