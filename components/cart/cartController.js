const cartServices=require("./cartServices")

module.exports.list=async (req,res)=>{
    const userId=req.user._id
    const cart=await cartServices.getCart(userId)
    let totalAmount=cart.items.reduce(function(sum,item){
        return sum+item.price;
    },0)
    cart.totalPrice=totalAmount
    res.render("cart/views/shopping-cart",{cart:cart})
}