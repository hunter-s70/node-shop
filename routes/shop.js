const express = require('express');
const ShopController = require('../controller/shop');

const router = express.Router();

router.get('/', ShopController.getIndex);

router.get('/products', ShopController.getProductsList);

router.get('/products/:productId', ShopController.getProductById);

router.get('/orders', ShopController.getOrdersList);

router.get('/cart', ShopController.getCart);

router.get('/delete-cart-item/:productId', ShopController.getCartItemDelete);

router.post('/cart', ShopController.postCart);

router.get('/checkout', ShopController.getCheckout);

module.exports = router;
