const authService = require('./authService');
const validateRegisterAccessibiliy = require('../helper/validateRegisterAccessibiliy');

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