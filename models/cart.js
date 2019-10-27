const cart = {
  products: [], // [{id, qty}, ...]
  totalPrice: 0
};

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Analyze the cart => Find existing product
    const existingProductIndex = cart.products.findIndex(
      prod => prod.id === id
    );
    const existingProduct = cart.products[existingProductIndex];
    let updatedProduct;
    // Add new product/ increase quantity
    if (existingProduct) {
      updatedProduct = { ...existingProduct };
      updatedProduct.qty += 1;
      // cart.products = [...cart.products];
      cart.products[existingProductIndex] = updatedProduct;
    } else {
      updatedProduct = { id: id, qty: 1 };
      cart.products = [...cart.products, updatedProduct];
    }
    cart.totalPrice = cart.totalPrice + +productPrice;
  }
};
