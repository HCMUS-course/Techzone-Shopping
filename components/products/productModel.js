const mongoose = require("mongoose");
const commentSchemma=require("./product.comment.model")
const productSchema = mongoose.Schema(
    {
        productType: String,
        name: String,
        brand: String,
        price: String,
        isSale: {
            status: Boolean,
            percent: Number
        },
        stock: String,
        screenSize:String,
        color: String,
        features : String,
        images: [],
        description: [],
        detail: {
           
            itemWeight: String,
            modelName: String, 
            os: String,
            manufacturer: String,
            releaseDate: String
        },
        buyCounts: Number,
        viewCounts: Number,
        comment: [commentSchemma]
    }
);

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;