

const productService = require('../products/productService');
const Cart=require("./cartModel")

module.exports.getCart=(userId)=>{
return Cart.findOne({userId:userId}).lean()
}

module.exports.postItem=async (userId,newItemId)=>{
   
    const newItem=await productService.detail(newItemId)
    await Cart.updateOne({userId:userId},{$push:{items:newItem}})
    return Cart.findOne({userId:userId}).lean()

    }


    module.exports.deleteItem=async (userId,ItemId)=>{
   

        return Cart.updateOne({ userId: userId }, {
            $pull: { items: {_id:{$in: [ItemId]}} }
        },{ safe: true, upsert: true });
        
    
        }