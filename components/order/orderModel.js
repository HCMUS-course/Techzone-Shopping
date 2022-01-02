const mongoose =require("mongoose")

const productSchema = mongoose.Schema(
    {
        "productType": "",
        "name": "",
        "brand":"",
        "price": "",
        "isSale": {
            "status": "",
            "percent": ""
        },
        "stock": "",
        "screenSize":"",
        "color": "",
        "features":"",
        "thumbnail":"",
        "images": ["", "", "", ""],
        "description": [
            "",
            "",
            "",
            "",
            ""
        ],
        "detail": {
            "itemDimensions":"",
            "itemWeight":"",
            "modelName":"",
            "processor":"",
            "os":"",
            "ram":"",
            "capacity":"",
            "mainCamera":"",
            "frontCamera":"",
            "battery":"",
            "powerAdapter": "",
            "manufacturer":"",
            "releaseDate":""
        },
        "buyCounts": "",
        "viewCounts": "",
        "comment": {
            "total": "",
            "items": [
                {
                    "name":"",
                    "content":"",
                    "date":"",
                    "rate":""
                }
            ]
        }
    }
);

const cartSchema=mongoose.Schema(
    {
        items: [productSchema],
        totalQty: Number,
        totalPrice: Number,
        userId:String,
    }
)

const orderShema = mongoose.Schema(
    {
        items : [
            {
            cart : cartSchema,
            address : String,
            phoneNumber : String,
            orderDate : String,
            deliveryDate : String,
            status : String
        }
        ],
        userId : String
        
    },
    {
        versionKey: false 
    }
)
const Order = mongoose.model('order', orderShema);
module.exports = Order;