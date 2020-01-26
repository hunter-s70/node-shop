const getDb = require('../util/database').getDb;
const mongo = require('mongodb');

class Product {
  constructor({title, price, description, imageUrl}) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
  
  save() {
    const db = getDb();
    return db.collection('products').insertOne(this)
      .then(results => {
        console.log(results);
      })
      .catch(err => console.log(err));
  }
  
  static getAllProducts() {
    const db = getDb();
    return db.collection('products').find().toArray()
      .then(products => products)
      .catch(err => console.log(err));
  }
  
  static getProductById(id) {
    const db = getDb();
    return db.collection('products').find({_id: new mongo.ObjectId(id)}).next()
      .then(product => product)
      .catch(err => console.log(err));
  }
}

module.exports = Product;
