const getDb = require('../util/database').getDb;
const mongo = require('mongodb');

class Product {
  constructor({title, price, description, imageUrl, id}) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongo.ObjectId(id) : null;
  }
  
  save() {
    const db = getDb();
    return db.collection('products').insertOne(this)
      .then(results => {
        console.log(results);
      })
      .catch(err => console.log(err));
  }
  
  update() {
    const db = getDb();
    return db.collection('products')
      .updateOne({_id: this._id}, {$set: this})
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
  
  static deleteById(id) {
    const db = getDb();
    return db.collection('products').deleteOne({_id: new mongo.ObjectId(id)})
      .then(product => product)
      .catch(err => console.log(err));
  }
}

module.exports = Product;
