const express = require('express');
const router = express.Router();
const accountController = require('./accountController');

router.use('/profile/:route', express.static('public'));
router.get('/profile/:id', accountController.getProfile);

router.use('/edit', express.static('public'));
router.get('/edit/:id', accountController.getEditProfile);
router.post('/edit/:id', accountController.updateProfile);

module.exports = router;