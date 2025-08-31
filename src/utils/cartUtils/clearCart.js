const clearCart = (products, cartItems) => {
  const newProducts = products.map((product) => {
    const inCart = cartItems.find((item) => item._id === product._id);
    return inCart ? { ...product, stock: product.stock + inCart.qty } : product;
  });

  const newCart = [];

  return { newCart, newProducts };
};

export default clearCart;
