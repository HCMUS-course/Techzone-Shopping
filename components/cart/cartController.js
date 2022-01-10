const cartServices=require("./cartServices")
const Cart=require("./cartModel")
module.exports.list=async (req,res)=>{
    const userId=req.user._id
    const cart=await cartServices.getCart(userId)
    if(cart == null){
        const it = []
        
        const newCart = new Cart()
        newCart.items = it
        newCart.totalQty = 0
        newCart.totalPrice = 0
        newCart.userId = userId
        newCart.save()
        const crt = await cartServices.getCart(userId)
        res.render("cart/views/shopping-cart",{cart:crt})
    }
    else{
    let totalAmount=cart.items.reduce(function(sum,item){
        return sum+item.price;
    },0)
    cart.totalPrice=totalAmount
    res.render("cart/views/shopping-cart",{cart:cart})
}
}