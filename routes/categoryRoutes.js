const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/categoryController')

router.post('create_category',CategoryController.createCategory);
router.put('update_category',CategoryController.updateCategory)
router.delete('delete_category',CategoryController.deleteCategory)
router.get('get_category_list',CategoryController.getCategoryList);

module.exports = router;