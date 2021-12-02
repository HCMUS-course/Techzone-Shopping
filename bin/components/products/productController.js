const productService = require('./productService');
const {pagination}=require('../helper/pagination-helper')
const {ObjectId} = require('mongodb');

const productPerPage = 4;

exports.list = async function(req,res){
    const page = req.params.page;
    let pageCount = 0;
    const products = await productService.list(Number(page));
    const NumberOfProduct = await productService.getNumberOfProduct();
    pageCount = Math.round(NumberOfProduct/productPerPage);
    const pageArray = pagination(Number(page),pageCount);
    res.render('products/list', {products,pageArray:pageArray});
    //const products = await productService.list();
    // res.render('products/list', {products});
};

exports.detail = async function(req,res){
    const product = await productService.detail(ObjectId(req.params.id));
    res.render('products/product-details',{ product });
};