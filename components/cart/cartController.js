const cartServices=require("./cartServices")

module.exports.list=async (req,res)=>{
    const userId=req.user._id
    const cart=await cartServices.getCart(userId)
    res.render("cart/views/shopping-cart",{cart:cart})
}