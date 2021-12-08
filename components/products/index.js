const express = require('express');
const router = express.Router();
const productController = require('./productController');

// DONT CHANGE THE ORDER OF ROUTE.GET()

router.get('/search',productController.search)

router.use('/:route', express.static('public'));
router.get('/:page', productController.list);

router.use('/id/:route', express.static('public'));
router.get('/id/:id', productController.detail);

// router.use('/search', express.static('public'));

module.exports = router;