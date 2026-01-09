const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { auth, admin } = require('../middleware/authMiddleware');

router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected Routes (Admin only)
router.post('/', auth, admin, createProduct);
router.patch('/:id', auth, admin, updateProduct);
router.delete('/:id', auth, admin, deleteProduct);

module.exports = router;
