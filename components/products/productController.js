const productService = require('./productService');
const {pagination}=require('../helper/pagination-helper')
const {ObjectId} = require('mongodb');

const productPerPage = 4;

exports.list = async function(req,res){
    const page =Number( req.params.page);
    const products = await productService.list(page,productPerPage);
    const NumberOfProduct = await productService.getNumberOfProduct();
    const pageCount = Math.ceil(NumberOfProduct/productPerPage);
    const pageArray = pagination(page,pageCount);
    res.render('products/views/list', {products,pageArray:pageArray});
};

exports.detail = async function(req,res){
    const id = req.params.id;
    await productService.increaseViewCounts(id);
    const product = await productService.detail(ObjectId(id));
    product.stringify = JSON.stringify(product);
    res.render('products/views/product-detail',{ product });
};

exports.search = async function(req,res){
    const key=req.query.key;
    const page=Number(req.query.page)
    const products = await productService.search(page,productPerPage,key);
    const NumberOfResult =await productService.getNumberOfSearchProduct(key);
    const pageCount = Math.ceil(NumberOfResult/productPerPage);
    const pageArray = pagination(page,pageCount);
    res.render('products/views/searchResult', {products,pageArray:pageArray,numberOfSeachResult:NumberOfResult,keyword:key});

} 




