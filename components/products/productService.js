const Product = require('./productModel');

//exports.list = () => Product.find({}).lean();
exports.detail = (id) => Product.findOne({_id : id}).lean();

exports.getOneProduct = (id) =>{
    const product = this.detail(id);
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