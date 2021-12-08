const Product = require('./productModel');

//exports.list = () => Product.find({}).lean();
exports.detail = (id) => Product.findOne({_id : id}).lean();

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