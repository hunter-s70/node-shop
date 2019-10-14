const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getAdminProducts = (req, res, next) => {
  const products = Product.fetchAll();
  res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin products',
    path: '/admin/products'
  });
};
