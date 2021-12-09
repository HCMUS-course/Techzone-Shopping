const express = require('express');
const router = express.Router();
const productController = require('./productController');

// DONT CHANGE THE ORDER OF ROUTE.GET()

router.get('/',productController.search)

module.exports = router;