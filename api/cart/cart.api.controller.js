const cartServices = require('../../components/cart/cartServices');

module.exports.postItem=async (req,res)=>{

    const userId=req.params.userId
   
    const newItemId=req.body.productId
   
   
    const cart=await cartServices.postItem(userId,newItemId)
    res.status(201).json(cart);
    // res.redirect("./")
}


module.exports.deleteItem=async (req,res)=>{

    const userId=req.params.userId
   
    const itemId=req.params.productId
   
   
    const cart=await cartServices.deleteItem(userId,itemId)
    res.status(201).json(cart);

}