

const productService = require('../products/productService');

const Cart = require("../cart/cartModel")
const Order=require("./orderModel")

module.exports.getCart=(userId)=>{
    
return Cart.findOne({userId : userId}).lean()
}

module.exports.getOrder=(userId)=>{
    return Order.findOne({userId : userId}).lean()
}



