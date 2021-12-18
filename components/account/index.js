const express = require('express');
const router = express.Router();
const accountController = require('./accountController');

router.get('/account/editProfile/:id', accountController.getEditProfilePage);

module.exports = router;