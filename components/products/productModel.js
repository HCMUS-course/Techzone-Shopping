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
        features:String,
        thumbnail:String,
        images: [],
        description: [],
        detail: {
            itemDimensions: String,
            itemWeight: String,
            modelName: String,
            processor: String,
            os: String,
            ram: String,
            capacity: String,
            mainCamera: String,
            frontCamera: String,
            battery: String,
            powerAdapter: String,
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