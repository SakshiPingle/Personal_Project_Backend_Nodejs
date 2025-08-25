const express = require('express');
const router = express.Router();
const multer = require("multer");
const ProductController = require('../controller/productController')


// Multer storage
// store file in "uploads" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post('/create_product',ProductController.createProduct);
router.put('/update_product',ProductController.updateProduct)
router.delete('/delete_product/:product_id',ProductController.deleteProduct)
router.get('/get_product_list/:page_size/:current_page/:sort_type',ProductController.getProductList);
router.get('/get_edit_product/:product_id',ProductController.getProductById)

router.post("/upload-excel", upload.single("file"), ProductController.uploadExcel);

module.exports = router;