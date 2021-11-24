const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING)

    console.log("Connnect to MongoDB successfully ");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports=connectDB

  