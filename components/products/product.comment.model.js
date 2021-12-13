const mongoose =require("mongoose")


const commentSchema=mongoose.Schema({
    content:String,
    createAt: String,
    username:String,
});

module.export = commentSchema;