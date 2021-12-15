const commentServices = require('../components/products/product.comment.services');

module.exports.getComments=async (req,res)=>{
    const productId=req.params.id
   
    const comments=await commentServices.getComments(productId)
    res.status(201).json(comments.comment);
    // res.redirect("./")
}