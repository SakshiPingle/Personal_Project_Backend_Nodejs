const express = require('express');
const router = express.Router();
const ProductController = require('../controller/productController')

router.post('/create_product',ProductController.createProduct);
router.put('/update_product',ProductController.updateProduct)
router.delete('/delete_product/:product_id',ProductController.deleteProduct)
router.get('/get_product_list/:page_size/:current_page/:sort_type',ProductController.getProductList);
router.get('/get_edit_product/:product_id',ProductController.getProductById)


module.exports = router;