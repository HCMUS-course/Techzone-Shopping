const Product = require('./productModel');
const productModel = require("../products/productModel");

//exports.list = () => Product.find({}).lean();
exports.detail = (id) => Product.findById(id).lean();

exports.getOneProduct = (id) =>{
    const product = this.detail(id);
}
exports.updateStock =async  (id,num)=>{
    await Product.updateOne({ _id: id },
        { $inc: {stock: num}}
    );
}
exports.getProductType = (product) =>{
    const type = product.productType;
    return type;
}

exports.getRelatedProducts = (type, id) =>{
    return Product.find({productType: type, _id: {$ne: id}}).lean();
}

exports.increaseViewCounts = async (id) =>{
    await Product.updateOne({ _id: id },
        { $inc: {viewCounts: 1}}
    );
}

exports.list = (pageNum,productPerPage) => {
   // số lượng sản phẩm xuất hiện trên 1 page
    let page = pageNum || 1;

    return Product
        .find()
        .skip((productPerPage * page)-productPerPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(productPerPage)
        .lean()
        .exec()
}

exports.getAllCategories = () => {
    return Product.distinct("productType");
}

exports.getAllBrands = () => {
    return Product.distinct("brand");
}

exports.getAllColors = () => {
    return Product.distinct("color");
}

exports.search = (pageNum,productPerPage,key) => {
    let page = pageNum || 1;
    let re = new RegExp(key);
    const regexSearch= { $regex: re, $options: 'i' } ;
    return Product
        .find({name:regexSearch})
        .skip((productPerPage * page) - productPerPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(productPerPage)
        .lean()
        .exec()
}


exports.getNumberOfProduct = () => {
    return Product.countDocuments();
}

exports.getFilterKey = (category, brand, color) => {
    var key = "";
    if (category != undefined) {
        key += "category=" + category;
    }
    if (brand != undefined) {
        key += "&brand=" + brand;
    }
    if (color != undefined) {
        key += "&color=" + color;
    }

    return key;
}

exports.getNumberOfSearchProduct = (key) => {
    let re = new RegExp(key);
    const regexSearch= { $regex: re, $options: 'i' } ;
    return Product
    .countDocuments({name:regexSearch});
}

exports.create =(req,res) =>{
    if(!reg.body){
        res.status(400).send({message:"Content can not be empty"});
        return;
    }

    newProduct
        .save(newProduct)
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message|| "Error"
            });
        });
}


exports.getNumberOfFilterProduct = (category, brandLowercase, color) =>{
    var count = "";
    var brand;
    if (category != undefined) {
        count += "1";
    }
    if (brandLowercase != undefined) {
        count += "2";
        brand = brandLowercase[0].toUpperCase() + brandLowercase.slice(1);
    }
    if (color != undefined) {
        count += "3";
    }

    switch (count) {
        case "1":
            return Product.find({productType: category}).countDocuments();
        case "12":
            return Product.find({productType: category, brand: brand}).countDocuments();
        case "13":
            return Product.find({productType: category, color: color}).countDocuments();
        case "123":
            return Product.find({productType: category, brand: brand, color: color}).countDocuments();
        case "2":
            return Product.find({brand: brand}).countDocuments();
        case "23":
            return Product.find({brand: brand, color: color}).countDocuments();
        case "3":
            return Product.find({color: color}).countDocuments();
    }
}

exports.filter = (pageNum, productPerPage, category, brandLowercase, color) =>{
    var count = "";
    var brand;
    if (category != undefined) {
        count += "1";
    }
    if (brandLowercase != undefined) {
        count += "2";
        brand = brandLowercase[0].toUpperCase() + brandLowercase.slice(1);
    }
    if (color != undefined) {
        count += "3";
    }

    let page = pageNum || 1;
    switch (count) {
        case "1":
            return Product
                .find({productType: category})
                .skip((productPerPage * page) - productPerPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
                .limit(productPerPage)
                .lean()
                .exec()
        case "12":
            return Product
                .find({productType: category, brand: brand})
                .skip((productPerPage * page) - productPerPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
                .limit(productPerPage)
                .lean()
                .exec()
        case "13":
            return Product
                .find({productType: category, color: color})
                .skip((productPerPage * page) - productPerPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
                .limit(productPerPage)
                .lean()
                .exec()
        case "123":
            return Product
                .find({productType: category, brand: brand, color: color})
                .skip((productPerPage * page) - productPerPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
                .limit(productPerPage)
                .lean()
                .exec()
        case "2":
            return Product
                .find({brand: brand})
                .skip((productPerPage * page) - productPerPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
                .limit(productPerPage)
                .lean()
                .exec()
        case "23":
            return Product
                .find({brand: brand, color: color})
                .skip((productPerPage * page) - productPerPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
                .limit(productPerPage)
                .lean()
                .exec()
        case "3":
            return Product
                .find({color: color})
                .skip((productPerPage * page) - productPerPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
                .limit(productPerPage)
                .lean()
                .exec()
    }
}

exports.sort = (pageNum, productPerPage, type) => {
    let page = pageNum || 1;

    switch (type) {
        case "bestsales":
            return productModel
                .find()
                .sort({buyCounts: -1})
                .skip((productPerPage * page) - productPerPage)
                .limit(productPerPage)
                .lean()
        case "mostviewed":
            return productModel
                .find()
                .sort({viewCounts: -1})
                .skip((productPerPage * page) - productPerPage)
                .limit(productPerPage)
                .lean()
        case "price-asc":
            return productModel
                .find()
                .sort({price: 1})
                .skip((productPerPage * page) - productPerPage)
                .limit(productPerPage)
                .lean()
        case "price-des":
            return productModel
                .find()
                .sort({price: -1})
                .skip((productPerPage * page) - productPerPage)
                .limit(productPerPage)
                .lean()
    }
}