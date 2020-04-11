const express = require('express');
const AdminController = require('../controller/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, AdminController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', isAuth, AdminController.postProduct);

router.get('/products', isAuth, AdminController.getAdminProducts);

router.get('/edit-product/:productId', isAuth, AdminController.getEditProduct);

router.post('/edit-product', isAuth, AdminController.postEditProduct);

router.get('/delete-product/:productId', isAuth, AdminController.getDeleteProduct);

module.exports = router;
