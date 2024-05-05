


const router = require('express').Router()

const {createProduct,searchProduct,getAllProducts,uploadImage,upload} = require("../controllers/product")




router.post("/createProduct", createProduct)
router.get("/search/:id",searchProduct)
router.get("/allproducts", getAllProducts);
router.post('/upload', upload.single('imageFile'),uploadImage);


module.exports=router; 