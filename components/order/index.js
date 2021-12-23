const express=require("express")
const router=express.Router();
const Cart = require("../cart/cartModel")
const Order=require("./orderModel");
const orderController=require("./orderController")

router.get('/',orderController.list)

router.post('/', async function(req, res){
    
    const userId = req.user._id;
    
    const cart =await Cart.findOne({userId:userId}).lean();
   
    const order =await Order.findOne({userId:userId}).lean();

    const temp = {
      cart : cart,
      address : req.body.address,
      phoneNumber : req.body.phone,
      date : req.body.date
    }

    const newvalues = { $set: {items: [], totalQty: 0,totalPrice: 0, userId :userId } };
    await Cart.updateOne({userId:userId},newvalues)

    if(order == null){
      const newOrder = new Order();
      
      newOrder.items.push(temp);
      newOrder.userId =  userId;

     
      newOrder.save((err,doc)=>{
        if(!err)
        res.redirect('/cart');
        
        else{
          console.log('Error during record inserted: '+ err);
        }
  
      });
    }
    else{
      
      
    
      await Order.updateOne({userId : userId},{$push:{items:{$each:[temp],$position:0}}}) 
      res.redirect('/cart');

    }
    
    
    
  });


module.exports=router