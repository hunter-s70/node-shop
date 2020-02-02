const mongo = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor({username, email, cart, id}) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id
  }
  
  save() {
    const db = getDb();
    return db.collection('users').insertOne(this)
      .then(user => user)
      .catch(err => console.log(err));
  }
  
  addToCart(product) {
    const db = getDb();
    const updatedCart = {
      items: [{
        productId: new mongo.ObjectId(product._id),
        quantity: 1}]
    };
    return db.collection('users').updateOne(
      {_id: new mongo.ObjectId(this._id)},
      {$set: {cart: updatedCart}}
    )
  }
  
  static findById(userId) {
    const db = getDb();
    return db.collection('users').find({_id: new mongo.ObjectId(userId)}).next()
      .then(user => user)
      .catch(err => console.log(err));
  }
}

module.exports = User;
