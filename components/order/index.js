const express=require("express")
const router=express.Router();
const Cart = require("../cart/cartModel")
const Order=require("./orderModel");
const orderController=require("./orderController")

router.get('/',orderController.list)
//router.post('/',orderController.setOrder)
router.post('/', async function(req, res){
    

    const userId = req.user._id;
    console.log(userId);
    const cart =await Cart.findOne({userId:userId}).lean();
   
    
    
    const newOrder = new Order();
    newOrder.cart = cart;
    newOrder.address = req.body.address;
    newOrder.phoneNumber = req.body.phone;
    newOrder.date = req.body.date;

    const newvalues = { $set: {items: [], totalQty: 0,totalPrice: 0, userId :userId } };
    await Cart.updateOne({userId:userId},newvalues)
    newOrder.save((err,doc)=>{
      if(!err)
      res.redirect('/cart');
      
      else{
        console.log('Error during record inserted: '+ err);
      }

    });

  });

module.exports=router