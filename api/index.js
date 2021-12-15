const express = require('express');
const router = express.Router();
const commentController=require("./comment.api.controller")

// DONT CHANGE THE ORDER OF ROUTE.GET()



router.get('/:id/comment',commentController.getComments);


module.exports = router;