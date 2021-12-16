const userService = require('./userService');
const validateRegisterAccessibiliy=require("../helper/validateRegisterAccessibiliy")

exports.register = async (req, res) => {
    
    const {username, email, password,confirmPassword} = req.body;
    const validateAccess=await validateRegisterAccessibiliy(username, email, password,confirmPassword)
    let validAccess=true;
    for(const isValidRegister in validateAccess){
        if(validateAccess[isValidRegister]===false)
        {
            validAccess=false;
            break;
        }
    }


    if(!validAccess)
    {
        res.render('auth/views/register',{validateAccess:validateAccess});
    }
    else{
        const user = await userService.register(username, email, password);
        res.redirect('/login');
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