const updateProductRating = async (productId, value) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/${productId}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        ratings: [{ value: value }]
      })
    }
  );

  if (!res.ok) {
    throw new Error('Error al actualizar la valoración.');
  }

  return await res.json();
};

export default updateProductRating;
