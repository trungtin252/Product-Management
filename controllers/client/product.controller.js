const Product = require("../../model/product.model");
// [GET] /products
module.exports.index = async (req, res) =>{
    const products = await Product.find({
        status : "active",
        deleted: false
    }).sort({position : "desc"});

    products.forEach(item => {
        item.newPrice = (item.price - (item.discountPercentage/100)*item.price).toFixed(0);
    })

    res.render("client/pages/products/index.pug", {
        title: "Sản phẩm",
        products : products
    });
}


module.exports.detail = async (req, res) => {
    const find = {
        deleted : false,
        slug: req.params.slug
    }

    const product = await Product.findOne(find);
    res.render("client/pages/products/detail.pug", {
        title: product.title,
        products : product
    });
}