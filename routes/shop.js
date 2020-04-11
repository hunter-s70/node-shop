const express = require('express');
const ShopController = require('../controller/shop');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', ShopController.getIndex);

router.get('/products', ShopController.getProductsList);

router.get('/products/:productId', ShopController.getProductById);

router.get('/orders', isAuth, ShopController.getOrdersList);

router.post('/order-create', isAuth, ShopController.postOrder);

router.get('/cart', isAuth, ShopController.getCart);

router.get('/delete-cart-item/:productId', isAuth, ShopController.getCartItemDelete);

router.post('/cart', isAuth, ShopController.postCart);

router.get('/checkout', isAuth, ShopController.getCheckout);

module.exports = router;
