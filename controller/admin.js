const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  const editMode = req.query.edit;
  if (!editMode) return redirect('/');
  Product.findById(productId, (product) => {
    if (!product) return redirect('/');
    res.render('admin/edit-product', {
      product,
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode
    });
  });
};


exports.getAdminProducts = (req, res, next) => {
  const products = Product.fetchAll();
  res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin products',
    path: '/admin/products'
  });
};
