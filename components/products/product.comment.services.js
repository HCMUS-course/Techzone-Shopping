const Product = require('./productModel');


module.exports.addComment=async (newComment,productId)=>{

   await Product
        .updateOne({_id:productId},{$push:{comment:newComment}})

    return Product.findById({_id:productId}).lean()
      
}