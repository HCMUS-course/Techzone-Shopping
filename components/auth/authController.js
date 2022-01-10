const authService = require('./authService');
const validateRegisterAccessibiliy = require('../helper/validateRegisterAccessibiliy');
const {request} = require("express");

exports.register = async (req, res) => {
    const {username, email, password,confirmPassword} = req.body;
    const validateAccess = await validateRegisterAccessibiliy(username, email, password,confirmPassword);
    let validAccess=true;
    for(const isValidRegister in validateAccess){
        if(validateAccess[isValidRegister] === false)
        {
            validAccess = false;
            break;
        }
    }

    if(!validAccess)
    {
        res.render('auth/views/register', {validateAccess:validateAccess});
    }
    else{
        const user = await authService.register(username, email, password);
        res.render('auth/views/notification');
    }
 
};

exports.login = (req, res) => {
    const wrongPassword = req.query['wrong-password'] !== undefined;
    res.render('auth/views/login', {wrongPassword});
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

exports.activate = async (req, res) =>{
    const email = req.query.email;
    const activationString = req.query['activation-string'];
    const result = await authService.activate(email, activationString);
    if (result) {
        const user = await authService.findByEmail(email);
        req.login(user, function(err) {
           if (err) {return next(err);}
           return res.redirect('/');
        });
    } else {
        res.render('auth/views/authentication-error');
    }
}

exports.forgotPasswordPage = async (req, res) =>{
    res.render('auth/views/forgot-password');
}

exports.forgotPassword = async (req, res) => {
    const email = req.body.email;
    await authService.sendPasswordResetLink(email);
    res.render('auth/views/forgot-password', {resetPasswordLink: true});
}

exports.resetPasswordPage = async (req, res) =>{
    const email = req.query.email;
    const resetToken = req.query['reset-token'];
    const result = await authService.verifyResetToken(email, resetToken);
    if (result) {
        res.render('auth/views/reset-password', {email});
    } else {
        res.render('../views/404');
    }
}

exports.resetPassword = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    await authService.resetPassword(email, password);
    res.redirect('/login');
}