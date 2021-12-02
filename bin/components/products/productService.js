const Product = require('./productModel');

//exports.list = () => Product.find({}).lean();
exports.detail = (id) => Product.findOne({_id : id}).lean();

exports.list = (pageNum) => {
    let perPage = 4; // số lượng sản phẩm xuất hiện trên 1 page
    let page = pageNum || 1;

    return Product
        .find()
        // find tất cả các data
        .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(perPage)
        .lean()
        .exec()
}


exports.getNumberOfProduct = () => {
    return Product.countDocuments();
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