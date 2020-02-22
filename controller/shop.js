const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.getAllProducts()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch(err => console.log(err));
};

exports.getProductsList = (req, res, next) => {
  Product.getAllProducts()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'Shop',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;
  Product.getProductById(productId)
    .then(product => {
      if (!product) return res.redirect('/');
      res.render('shop/product-details', {
        product,
        pageTitle: 'Details',
        path: '/products'
      })
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.getProductById(productId)
    .then(product => {
      if (!product) return res.redirect('/');
      return req.user.addToCart(product);
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user.getCartProducts().then(products => {
    res.render('shop/cart', {
      products: products,
      pageTitle: 'Cart',
      path: '/cart',
    });
  }).catch(err => console.log(err));
};

exports.getCartItemDelete = (req, res, next) => {
  const productId = req.params.productId;
  req.user.deleteFromCart(productId)
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};

exports.getOrdersList = (req, res, next) => {
  req.user.getOrders()
    .then(orders => {
      res.render('shop/orders', {
        orders,
        pageTitle: 'Orders list',
        path: '/orders',
      });
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};
