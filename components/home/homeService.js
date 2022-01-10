const productModel = require('../products/productModel');

const numBestSeller = 10;

exports.getLaptops = () =>{
    return productModel.find({productType: "laptop"}).lean();
}

exports.getSmartphones = () =>{
    return productModel.find({productType: "smartphone"}).lean();
}

exports.getTablets = () =>{
    return productModel.find({productType: "tablet"}).lean();
}

exports.getTvs = () =>{
    return productModel.find({productType: "tv"}).lean();
}

exports.getBestSellersProduct = () =>{
    return productModel
        .find()
        .sort({buyCounts: -1})
        .limit(numBestSeller)
        .lean()
}

exports.getBestViewersProduct = () =>{
    return productModel
        .find()
        .sort({viewCounts: -1})
        .limit(numBestSeller)
        .lean()
}