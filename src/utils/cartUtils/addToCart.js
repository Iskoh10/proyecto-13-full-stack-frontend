const addToCart = (product, products, cartItems) => {
  const found = cartItems.find((item) => item._id === product._id);
  const newCart = found
    ? cartItems.map((item) =>
        item._id === product._id ? { ...item, qty: item.qty + 1 } : item
      )
    : [...cartItems, { ...product, qty: 1 }];

  const newProducts = products.map((p) =>
    p._id === product._id ? { ...p, stock: p.stock - 1 } : p
  );

  return { newCart, newProducts };
};

export default addToCart;
