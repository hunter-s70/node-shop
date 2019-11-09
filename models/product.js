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
    this.id = Math.random().toString();
    products.push(this);
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
    return products;
  }
  
  static findById(id, cb) {
    const product = products.find(item => item.id == id);
    cb(product);
  }
};
