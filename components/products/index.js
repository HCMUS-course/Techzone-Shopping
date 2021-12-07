const express = require('express');
const router = express.Router();
const productController = require('./productController');

router.use('/:route', express.static('public'));
router.get('/:page', productController.list);


router.get('/id/:id', productController.detail);

module.exports = router;