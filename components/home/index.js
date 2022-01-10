const express = require('express');
const router = express.Router();
const homeController = require('./homeController');

//router.use('/', express.static('public'));
router.get('/', homeController.getHomepage);

module.exports = router;