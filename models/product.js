const products = [];

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  
  save() {
    this.id = Math.random().toString();
    products.push(this);
  }
  
  static fetchAll() {
    return products;
  }
  
  static productById(id, cb) {
    const product = products.find(item => item.id == id);
    cb(product);
  }
};
