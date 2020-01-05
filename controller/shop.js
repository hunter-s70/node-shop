const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch(err => console.log(err));
};

exports.getProductsList = (req, res, next) => {
  Product.fetchAll()
    .then(([products]) => {
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
  Product.findById(productId, (product) => {
    res.render('shop/product-details', {
      product: product,
      pageTitle: 'Details',
      path: '/products'
    });
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
    res.redirect('/cart');
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cartData) => {
    Product.fetchAll()
      .then(([products]) => {
        const cartProducts = [];
        for (let product of products) {
          const cartProductData = cartData.products.find(prod => prod.id === product.id);
          if (cartProductData) {
            cartProducts.push({productData: product, qty: cartProductData.qty});
          }
        }
        res.render('shop/cart', {
          products: cartProducts,
          pageTitle: 'Cart',
          path: '/cart',
        });
      })
      .catch(err => console.log(err));
  });
};

exports.getCartItemDelete = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect('/cart');
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
