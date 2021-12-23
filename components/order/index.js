const express=require("express")
const router=express.Router();

const orderController=require("./orderController")

router.use(express.static("public")); 
router.get('/history',orderController.showHistory)
router.get('/',orderController.list)
router.post('/', orderController.createOrder)


module.exports=router