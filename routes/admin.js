const express = require('express');
const path = require('path');
const ProductController = require('../controller/products');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', ProductController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', ProductController.postProduct);

module.exports = router;
