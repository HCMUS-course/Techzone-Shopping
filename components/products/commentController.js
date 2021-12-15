const commentServices = require('./product.comment.services');
const getCurentDate=require("../helper/getCurrentDate")
module.exports.postComment=async (req,res)=>{
    const productId=req.params.id
    let username="Anonymous";
    if (req.user){
         username=req.user.username;
    }
    const newcomment={
        content:req.body.content,
        createAt: getCurentDate(),
        username:username,
    }

    const product=await commentServices.addComment(newcomment,productId)
    const comment=product.comment
    res.status(201).json(comment)
    // res.redirect("./")
}