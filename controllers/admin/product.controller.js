const Product = require("../../model/product.model");
const paginationHelper = require("../../helpers/pagination");
// [GET] /admin/products
module.exports.index = async (req, res) => {

    const find = {
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status;
    }

    // Search
    const searchHelper = require("../../helpers/search");
    const objectSearch = searchHelper(req.query);

    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    // Pagination

    const countPage = Math.ceil(await Product.countDocuments(find));

    let objectPagination = paginationHelper({
        currentPage: 1,
        limitItems: 4
    }, req.query, countPage);



    const products = await Product.find(find)
        .sort({ position: "desc" })
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);


    let index = 1
    products.forEach(item => {
        item.newPrice = (item.price - (item.discountPercentage / 100) * item.price).toFixed(0);
        item.index = index;
        index = index + 1;
    });



    res.render('admin/pages/products/index', {
        title: "Quản lý sản phẩm",
        products: products,
        keyword: objectSearch.keyword,
        objectPagination: objectPagination
    })
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { status: status });
    req.flash('success', 'Cập nhật trạng thái thành công !');
    res.redirect("back");
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: type });
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: type });
            break;
        case "delete":
            await Product.updateMany({ _id: { $in: ids } }, { deleted: true });
            break;
        case "change-position":
            for (const item of ids) {
                const [id, position] = item.split(" - ");
                await Product.updateOne({ _id: id }, { position: position });
            }
            break;
        default:
            break;
    }
    req.flash('success', 'Cập nhật trạng thái thành công !');
    res.redirect("back");
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { deleted: true });

    res.redirect("back");
}

module.exports.create = async (req, res) => {
    res.render('admin/pages/products/create', {
        title: "Thêm sản phẩm",
    })
}

module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if(req.body.position == ""){
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    }else{
        req.body.position = parseInt(req.body.position);
    }

    req.body.thumbnail = `/uploads/${req.file.filename}`
    const product = new Product(req.body);
    await product.save();

    res.redirect("/admin/products");
}



module.exports.edit = async (req, res) => {

    const find = {
        deleted : false,
        _id: req.params.id
    }

    const product = await Product.findOne(find);
    res.render('admin/pages/products/edit', {
        title: "Sửa sản phẩm",
        product : product
    })
}

module.exports.editPatch = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    const id = req.params.id;

    if(req.body.position == ""){
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    }else{
        req.body.position = parseInt(req.body.position);
    }
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }
    try {
        await Product.updateOne({  _id : id}, req.body);
        req.flash('success', 'Cập nhật thành công !');
    } catch (error) {
        req.flash('error', 'Cập nhật thất bại !');
    }
    
    res.redirect("/admin/products");
}


