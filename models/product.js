const db = require('../util/database');
const Cart = require('../models/cart');
const products = [];

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  
  save() {
    return db.execute('INSERT INTO products (title, imageUrl, description, price) VALUES [?, ?, ?, ?]',
      [this.title, this.imageUrl, this.description, this.price]);
  }
  
  update() {
    if (this.id) {
      products.forEach((product, index) => {
        if (product.id === this.id) {
          products[index] = this;
        }
      });
    }
  }
  
  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }
  
  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
  
  static deleteProduct(id, cb) {
    products.forEach((product, index) => {
      if (product.id === id) {
        Cart.deleteProduct(id, product.price);
        products.splice(index, 1);
        cb(product);
      }
    });
  }
};
