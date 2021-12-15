const Product = require('./productModel');


module.exports.addComment=async (newComment,productId)=>{

   await Product
        .updateOne({_id:productId},{$push:{comment:{$each:[newComment],$position:0}}})

    return Product.findById({_id:productId}).lean()
      
}

module.exports.getComments=async(productId)=>{

    return Product.findById({_id:productId},{comment:1, _id:0}).lean()
 
     
       
 }