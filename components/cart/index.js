const express=require("express")
const router=express.Router();
const cartController=require("./cartController")

router.get("/",cartController.list)

module.exports=router