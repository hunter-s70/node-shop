const mongoose = require('mongoose');
const Order = require('./order');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }]
  }
});

userSchema.methods.addToCart = function (product) {
  const cartProducts = this.cart && this.cart.items && Array.isArray(this.cart.items) ? this.cart.items : [];
  const productId = product._id;
  const updatedCartItems = [...cartProducts];
  const cartProductIndex = cartProducts.findIndex(product => product.productId.toString() === productId.toString());
  const isProductInCart = cartProductIndex >= 0;
  const quantity = isProductInCart ? cartProducts[cartProductIndex].quantity + 1 : 1;
  if (isProductInCart) {
    updatedCartItems[cartProductIndex].quantity = quantity;
  } else {
    updatedCartItems.push({productId, quantity});
  }
  this.cart = {items: updatedCartItems};
  return this.save();
};

userSchema.methods.deleteFromCart = function (productId) {
  const cartProducts = this.cart && this.cart.items && Array.isArray(this.cart.items) ? this.cart.items : [];
  const updatedCartItems = cartProducts.filter(product => {
    return product.productId.toString() !== productId.toString();
  });
  this.cart = {items: updatedCartItems};
  return this.save();
};

userSchema.methods.addOrder = function () {
  return this.populate('cart.items.productId')
    .execPopulate()
    .then((data) => {
      const cartProducts = data.cart && data.cart.items && Array.isArray(data.cart.items) ? data.cart.items : [];
      const order = new Order({
        items: cartProducts,
        userId: this._id
      });
      return order.save();
    })
    .then(() => {
      return this.clearCart();
    })
    .catch(err => console.log(err));
};

userSchema.methods.clearCart = function () {
  this.cart = {items: []};
  this.save();
};

module.exports = mongoose.model('User', userSchema);
