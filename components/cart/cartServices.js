

const Product = require('../products/productModel');
const productService = require('../products/productService');
const Cart=require("./cartModel")

module.exports.getCart=(userId)=>{
return Cart.findOne({userId:userId}).lean()
}

module.exports.postItem=async (userId,newItemId)=>{
   
    const newItem=await productService.detail(newItemId)
    if(newItem != null){
    if(newItem.stock > 0){
        productService.updateStock(newItemId,-1)
    
    
    const cart = await Cart.findOne({userId:userId}).lean()
    
    const sum = cart.totalPrice + newItem.price
    
    await Cart.updateOne({userId:userId},{$push:{items:newItem}})
    await Cart.updateOne({userId:userId},{$set:{totalPrice : sum}})
    }
    return Cart.findOne({userId:userId}).lean()

    }
}

    module.exports.deleteItem=async (userId,ItemId)=>{
   
        await productService.updateStock(ItemId,1)
        const item = await productService.detail(ItemId)
        const money = item.price
        await Cart.updateOne({userId:userId},{$inc:{totalPrice : -money}})
        return Cart.updateOne({ userId: userId }, {
            $pull: { items: {_id:{$in: [ItemId]}} }
        },{ safe: true, upsert: true });
        
    
        }