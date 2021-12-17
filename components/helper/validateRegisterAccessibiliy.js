const authService = require('../auth/authService');

const validateEmail = async (email) =>{
   const valid = await authService.validateEmailAccessibility(email)
        if (valid) {
         return true;
        } else {
        return false;
        }
};


const validateUsername = async (username)=>{
    const valid = await authService.validateUsernameAccessibility(username);
    if (valid) {
     return true;
    } else {
    return false;
    }
};



const validatePassword = (pwd) =>{
  return pwd.length >= 6;
};



module.exports = validateRegisterAccessibiliy = async (username, email, password, confirmpassword) =>{
    const validateAccess = {
        isValidUsername: true,
        isValidEmail: true,
        isValidPassword: true,
        isValidConfirmPassword: (password == confirmpassword),
    };
    
    validateAccess.isValidEmail= await validateEmail(email);
    validateAccess.isValidUsername= await validateUsername(username);
    validateAccess.isValidPassword=validatePassword(password);
    
    return validateAccess;
};