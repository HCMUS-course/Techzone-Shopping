const express = require('express');
const router = express.Router();
const productController = require('./productController');
const commentController=require("./commentController")

// DONT CHANGE THE ORDER OF ROUTE.GET()



router.use('/:route', express.static('public'));
router.get('/:page', productController.list);

router.use('/id/:route', express.static('public'));
router.get('/id/:id', productController.detail);
router.post('/id/:id/comment', commentController.postComment);

router.get('/:id/filter', productController.filter);

// router.use('/search', express.static('public'));

module.exports = router;