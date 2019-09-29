const express = require('express');
const ProductController = require('../controller/products');

const router = express.Router();

router.get('/', ProductController.getProductsList);

module.exports = router;
