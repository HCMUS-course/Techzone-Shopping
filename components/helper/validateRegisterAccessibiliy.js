const userServices=require("../auth/userService")

const validateEmail=async (email)=>{
   const valid=await userServices.validateEmailAccessibility(email)
        if (valid) {
         return true;
        } else {
        return false;
        }
};


const validateUsername=async (Username)=>{
    const valid=await userServices.validateUsernameAccessibility(Username)
        if (valid) {
         return true;
        } else {
        return false;
        }
};



const validatePassword=(pwd)=>{
  return pwd.length>=6
}



module.exports=validateRegisterAccessibiliy=async (username,email,password,confirmpassword)=>{
    const validateAccess={
        isValidUsername:true,
        isValidEmail:true,
        isValidPassword:true,
        isValidConfirmPassword:(password==confirmpassword),
    }
    
    validateAccess.isValidEmail=await validateEmail(email)
    validateAccess.isValidUsername= await validateUsername(username)
    validateAccess.isValidPassword=validatePassword(password)
    
    return validateAccess
}