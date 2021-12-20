const accountService = require('./accountService');
const validateEditProfile = require('../helper/validateRegisterAccessibiliy');

exports.getProfile =  async (req, res, next) =>{
    const user = await accountService.getOneAccount(req.params.id);
    res.render('account/views/profile', {user});
}

exports.getEditProfile =  async (req, res, next) =>{
    const isValidUsername = true;
    const isValidEmail = true;
    const user = await accountService.getOneAccount(req.params.id);
    res.render('account/views/editProfile', {user, isValidUsername, isValidEmail});
}

exports.updateProfile =  async (req, res, next) =>{
    const id = req.params.id;
    const username = req.body.username;
    const email = req.body.email;

    const isValidUsername = await accountService.validateUsername(id, username);
    const isValidEmail = await accountService.validateEmail(id, email);

    let validAccess = true;
    if (!isValidUsername || !isValidEmail) {
        validAccess = false;
    }

    if(!validAccess) {
        const user = await accountService.getOneAccount(id);
        res.render('account/views/editProfile', {user, isValidUsername, isValidEmail});
    }
    else{
        const result = await accountService.updateProfile(id, req.body);
        const user = await accountService.getOneAccount(id);
        const changingStatus = true;
        res.render('account/views/profile', {user, changingStatus});
    }
}