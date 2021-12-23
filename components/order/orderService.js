

const productService = require('../products/productService');

const Cart = require("../cart/cartModel")
const Order=require("./orderModel")

module.exports.getCart=(userId)=>{
    
return Cart.findOne({userId : userId}).lean()
}

module.exports.getOrder=(userId)=>{
    return Order.findOne({userId : userId}).lean()
}

module.exports.updateCart=(userId,temp)=>{
    return Cart.updateOne({userId:userId},temp)
}

module.exports.updateOrder=(userId,temp)=>{
    return Order.updateOne({userId : userId},{$push:{items:{$each:[temp],$position:0}}})
}



