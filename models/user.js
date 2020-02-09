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
    const db = getDb();
    const cartProducts = this.cart && this.cart.items && Array.isArray(this.cart.items) ? this.cart.items : [];
    const productId = new mongo.ObjectId(product._id);
    const updatedCartItems = [...cartProducts];
    const cartProductIndex = cartProducts.findIndex(product => product.productId.toString() === productId.toString());
    const isProductInCart = cartProductIndex >= 0;
    const quantity = isProductInCart ? cartProducts[cartProductIndex].quantity + 1 : 1;
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
  
  deleteFromCart(productId) {
    const db = getDb();
    const cartProducts = this.cart && this.cart.items && Array.isArray(this.cart.items) ? this.cart.items : [];
    const updatedCartItems = cartProducts.filter(product => {
      return product.productId.toString() !== productId.toString();
    });
    return db.collection('users').updateOne(
      {_id: new mongo.ObjectId(this._id)},
      {$set: {cart: {items: updatedCartItems}}}
    )
  }
  
  getCartProducts() {
    const db = getDb();
    const cartProducts = this.cart && this.cart.items && Array.isArray(this.cart.items) ? this.cart.items : [];
    const cartProductIds = cartProducts.map(product => product.productId);
    return db.collection('products')
      .find({_id: {$in: cartProductIds}})
      .toArray()
      .then(products => {
        return products.map(product => {
          return {
            ...product,
            quantity: cartProducts.find(cartProduct => {
              return  cartProduct.productId.toString() === product._id.toString();
            }).quantity
          }
        });
      })
      .catch(err => console.log(err));
  }
  
  static findById(userId) {
    const db = getDb();
    return db.collection('users').find({_id: new mongo.ObjectId(userId)}).next()
      .then(user => user)
      .catch(err => console.log(err));
  }
}

module.exports = User;
