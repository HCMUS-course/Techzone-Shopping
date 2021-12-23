const orderServices=require("./orderService")

module.exports.list=async (req,res)=>{
    const userId=req.user._id
    const cart=await orderServices.getCart(userId)
    var temp = ""
    if(cart.totalPrice == 0){
        temp = "hidden"
    }
    res.render("order/views/checkout",{cart:cart,btnType : temp})
}

module.exports.showHistory=async (req,res)=>{
    const userId=req.user._id
    const order=await orderServices.getOrder(userId)
    // var temp = ""
    // if(cart.totalPrice == 0){
    //     temp = "hidden"
    // }
    res.render("order/views/history",{order:order})
}