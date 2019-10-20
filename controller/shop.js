const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  const products = Product.fetchAll();
  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
  });
};

exports.getProductsList = (req, res, next) => {
  const products = Product.fetchAll();
  res.render('shop/product-list', {
    prods: products,
    pageTitle: 'Shop',
    path: '/products'
  });
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;
  const products = Product.fetchAll();
  const product = products.find(item => item.id == productId);
  res.render('shop/product-details', {
    product: product,
    pageTitle: 'Details',
    path: '/products'
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
