const express = require('express');
const router = express.Router();
const authController = require('./authController');
const passport = require("../../passport");

router.get('/login', authController.login);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?wrong-password',
}));

router.get('/logout', authController.logout);
router.post('/register', authController.register);
router.get('/activate', authController.activate);
router.get('/forgot-password', authController.forgotPasswordPage);
router.post('/forgot-password', authController.forgotPassword);
router.get('/reset-password', authController.resetPasswordPage);
router.post('/reset-password', authController.resetPassword);

module.exports = router;