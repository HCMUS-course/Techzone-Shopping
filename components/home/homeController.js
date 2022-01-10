const homeService = require('./homeService');


exports.getHomepage = async function(req,res){
    const laptops = await homeService.getLaptops();
    const smartphones = await homeService.getSmartphones();
    const tablets = await homeService.getTablets();
    const tvs = await homeService.getTvs();
    const bestSellers = await homeService.getBestSellersProduct();
    const bestViewers = await homeService.getBestViewersProduct()

    res.render('../views/index', {bestSellers, bestViewers, laptops, smartphones, tablets, tvs});
};
