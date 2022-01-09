

const productService = require('../products/productService');
const Cart=require("./cartModel")

module.exports.getCart=(userId)=>{
return Cart.findOne({userId:userId}).lean()
}

module.exports.postItem=async (userId,newItemId)=>{
   
    const newItem=await productService.detail(newItemId)
    if(newItem.stock > 0){
        productService.updateStock(newItemId,-1)
    
    
    const cart = await Cart.findOne({userId:userId}).lean()
    
    const sum = cart.totalPrice + newItem.price
    
    await Cart.updateOne({userId:userId},{$push:{items:newItem}})
    await Cart.updateOne({userId:userId},{$set:{totalPrice : sum}})
    }
    return Cart.findOne({userId:userId}).lean()

    }


    module.exports.deleteItem=async (userId,ItemId)=>{
   
        await productService.updateStock(ItemId,1)
        return Cart.updateOne({ userId: userId }, {
            $pull: { items: {_id:{$in: [ItemId]}} }
        },{ safe: true, upsert: true });
        
    
        }