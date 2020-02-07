const mongo = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor({username, email, cart, id}) {
    this.name = username;
    this.email = email;
    this.cart = cart; // cart: {items: [{productId: ObjectId, quantity: 1}, {...}]}
    this._id = id
  }
  
  save() {
    const db = getDb();
    return db.collection('users').insertOne(this)
      .then(user => user)
      .catch(err => console.log(err));
  }
  
  addToCart(product) {
    if (this.cart && this.cart.items && Array.isArray(this.cart.items)) {
      const db = getDb();
      const productId = new mongo.ObjectId(product._id);
      const updatedCartItems = [...this.cart.items];
      const cartProductIndex = this.cart.items.findIndex(product => product.productId.toString() === productId.toString());
      const isProductInCart = cartProductIndex >= 0;
      const quantity = isProductInCart ? this.cart.items[cartProductIndex].quantity + 1 : 1;
      if (isProductInCart) {
        updatedCartItems[cartProductIndex].quantity = quantity;
      } else {
        updatedCartItems.push({productId, quantity});
      }
      return db.collection('users').updateOne(
        {_id: new mongo.ObjectId(this._id)},
        {$set: {cart: {items: updatedCartItems}}}
      )
      // delete from cart
      // return db.collection('users').updateOne(
      //   {_id: new mongo.ObjectId(this._id)},
      //   {$pop: {'cart.items': -1}}
      // )
    }
  }
  
  static findById(userId) {
    const db = getDb();
    return db.collection('users').find({_id: new mongo.ObjectId(userId)}).next()
      .then(user => user)
      .catch(err => console.log(err));
  }
}

module.exports = User;
