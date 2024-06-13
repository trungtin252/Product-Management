const express = require("express")
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
// const upload = multer({ dest: './public/uploads/' })
// const upload = require('../../helpers/storeMuler');
const upload = multer()
const uploadCloudModule = require('../../middlewares/admin/uploadCloud.middlewares');




const route = express.Router();
const controller = require('../../controllers/admin/product.controller')

route.get('/', controller.index)

route.patch("/change-status/:status/:id", controller.changeStatus);
route.patch("/change-multi", controller.changeMulti);
route.delete("/delete/:id", controller.deleteItem);
route.get('/create', controller.create);



route.post('/create', upload.single("thumbnail"), uploadCloudModule.uploadCloud ,controller.createPost
);
route.get("/edit/:id", controller.edit);
route.patch("/edit/:id", upload.single("thumbnail"), controller.editPatch)

module.exports = route;