const productService = require('./productService');
const {pagination}=require('../helper/pagination-helper');

const productPerPage = 6;

exports.list = async function(req,res){
    const page =Number( req.params.page);

    const categories = await productService.getAllCategories();
    const brands = await productService.getAllBrands();
    const colors = await productService.getAllColors();

    const products = await productService.list(page,productPerPage);
    const NumberOfProduct = await productService.getNumberOfProduct();
    const pageCount = Math.ceil(NumberOfProduct/productPerPage);
    const pageArray = pagination(page,pageCount);

    res.render('products/views/list', {products,pageArray:pageArray, categories, brands, colors});
};

exports.detail = async function(req, res){
    const id = req.params.id;
    await productService.increaseViewCounts(id);
    const product = await productService.detail(id);

    const productType = await productService.getProductType(product);
    const relatedProducts = await productService.getRelatedProducts(productType, id);
    const numOfRelatedProducts = relatedProducts.length;

    res.render('products/views/product-detail',{ product, relatedProducts, numOfRelatedProducts});
};

exports.search = async function(req,res){
    const categories = await productService.getAllCategories();
    const brands = await productService.getAllBrands();
    const colors = await productService.getAllColors();

    const key = req.query.key;
    const page = Number(req.query.page)
    const products = await productService.search(page,productPerPage,key);
    const NumberOfResult = await productService.getNumberOfSearchProduct(key);
    const pageCount = Math.ceil(NumberOfResult/productPerPage);
    const pageArray = pagination(page,pageCount);
    res.render('products/views/searchResult', {products,pageArray:pageArray,numberOfSeachResult:NumberOfResult,keyword:key,
        categories, brands, colors});
}

exports.filter = async function(req, res){
    const category = req.query.category;
    const brand = req.query.brand;
    const color = req.query.color;
    const page = Number(req.query.page);

    const key = productService.getFilterKey(category, brand, color);

    const categories = await productService.getAllCategories();
    const brands = await productService.getAllBrands();
    const colors = await productService.getAllColors();

    const products = await productService.filter(page, productPerPage, category, brand, color);

    const numberProduct = await productService.getNumberOfFilterProduct(category, brand, color);
    const pageCount = Math.ceil(numberProduct / productPerPage);
    const pageArray = pagination(page,pageCount);

    res.render('products/views/list', {products, pageArray:pageArray, pageFilter: true, filterKey: key, categories, brands, colors});
}



