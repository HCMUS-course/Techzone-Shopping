const express = require('express');
const router = express.Router();
const accountController = require('./accountController');

router.use('/profile/:route', express.static('public'));
router.get('/profile/:id', accountController.getProfile);

router.use('/profile/edit', express.static('public'));
router.get('/profile/edit/:id', accountController.getEditProfile);
router.post('/profile/edit/:id', accountController.updateProfile);

router.use('/password/change', express.static('public'));
router.get('/password/change/:id', accountController.getChangePassword);
router.post('/password/change/:id', accountController.updatePassword);

module.exports = router;