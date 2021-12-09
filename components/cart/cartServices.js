
const Cart=require("./cartModel")

module.exports.getCart=(userId)=>{
return Cart.findOne({userId:userId}).lean()
}