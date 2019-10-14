const express = require('express');
const AdminController = require('../controller/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', AdminController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', AdminController.postProduct);

router.get('/products', AdminController.getAdminProducts);

module.exports = router;
