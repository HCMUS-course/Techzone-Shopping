const commentServices = require('./product.comment.services');
const getCurentDate=require("../helper/getCurrentDate")
module.exports.postComment=async (req,res)=>{
    const productId=req.body.productId
    let username="Anonymous";
    if (req.user){
         username=req.user.username;
    }
    const newcomment={
        content:req.body.content,
        createAt: getCurentDate(),
        username:username,
    }

    const comment=await commentServices.addComment(newcomment,productId)
    // res.status(201).json(comment)
    res.redirect("./")
}