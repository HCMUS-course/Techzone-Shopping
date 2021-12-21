

const productService = require('../products/productService');

const Cart = require("../cart/cartModel")

module.exports.getCart=(userId)=>{
    
return Cart.findOne({userId : userId}).lean()
}

