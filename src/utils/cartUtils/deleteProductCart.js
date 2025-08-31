const deleteProductCart = (product, products, cartItems) => {
  const found = cartItems.find((item) => item._id === product._id);
  const qtyToReturn = found ? found.qty : 0;

  const newCart = cartItems.filter((item) => item._id !== product._id);

  const newProducts = products.map((p) =>
    p._id === product._id ? { ...p, stock: p.stock + qtyToReturn } : p
  );

  return { newCart, newProducts };
};

export default deleteProductCart;
