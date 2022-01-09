const express = require('express');
const router = express.Router();
const productController = require('./productController');



router.get('/filter', productController.filter);

module.exports = router;