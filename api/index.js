const express = require('express');
const router = express.Router();
const commentController=require("./comment/comment.api.controller")
const cartController=require("./cart/cart.api.controller")
const loggedInUserGuard = require('../middlewares/loggedInUserGuard');




// DONT CHANGE THE ORDER OF ROUTE.GET()



router.get('/:id/comment',commentController.getComments);

router.post("/:userId/addItem",loggedInUserGuard,cartController.postItem)
router.post("/:userId/delete/:productId",loggedInUserGuard,cartController.deleteItem)

module.exports = router;