// product.js (Controller)

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../models/product');

const createProduct = async (req, res) => {
    try {
        const { name, price, description, category,imgID } = req.body.data;
        const newProduct = new Product({ name, price, description, category ,imgID});
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a product', message: error.message });
    }
};

const searchProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search for product', message: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get products', message: error.message });
    }
};

const uploadImage = async (req, res) => {
    console.log('date now: ', Date.now());
    res.status(200).send('File uploaded successfully');
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        id = req.query.id;
        const dir = `C:/Users/louay/OneDrive/Bureau/web-site-insurance-e-commerce-main/e-commerce/src/img/${id}/`;
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const type = req.query.type;
        const ext = path.extname(file.originalname);
        cb(null,'image' + ext);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (ext && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

module.exports = {
    createProduct,
    searchProduct,
    getAllProducts,
    uploadImage,
    upload
};
