const express = require('express');
const router = express.Router();
const productController = require('./productController');



router.get('/',productController.search)

module.exports = router;