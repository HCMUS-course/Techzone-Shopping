const orderServices=require("./orderService")

module.exports.list=async (req,res)=>{
    const userId=req.user._id
    const cart=await orderServices.getCart(userId)
    res.render("order/views/checkout",{cart:cart})
}