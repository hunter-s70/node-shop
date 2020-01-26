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
  const product = new Product({title, imageUrl, description, price});
  product.save()
    .then(() => {
      // res.redirect('/admin/products');
    }).catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  const editMode = req.query.edit;
  if (!editMode) return redirect('/');
  Product.findOne({
    where: {id: productId}
  })
    .then(product => {
      if (!product) return res.redirect('/');
      res.render('admin/edit-product', {
        product: product.dataValues,
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findOne({
    where: {id: productId}
  })
    .then(product => {
      product.title = req.body.title;
      product.imageUrl = req.body.imageUrl;
      product.price = req.body.price;
      product.description = req.body.description;
      return product.save();
    })
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};


exports.getAdminProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getDeleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findOne({
    where: {id: productId}
  })
    .then(product => {
      return product.destroy();
    })
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
