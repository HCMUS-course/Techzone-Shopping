var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.body.username === undefined) {
        res.render('auth/views/register',{validateAccess:{isValidUsername:true,isValidEmail:true,isValidPassword:true,isValidConfirmPassword:true}});
    } else {
        res.render('auth/views/register');
    }
});

module.exports = router;