const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  res.render('shop/index', {
    pageTitle: 'Shop',
    path: '/',
  });
};

exports.getProductsList = (req, res, next) => {
  const products = Product.fetchAll();
  res.render('shop/product-list', {
    prods: products,
    pageTitle: 'Shop',
    path: '/products',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Cart',
    path: '/cart',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};

exports.getOrdersList = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Orders list',
    path: '/orders',
  });
};
