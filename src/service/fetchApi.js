const fetchApi = async ({ filters, page = 1 }) => {
  try {
    let url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/products`;

    if (filters.typeProduct && filters.typeProduct !== 'allProducts') {
      url += `/filter?typeProduct=${encodeURIComponent(
        filters.typeProduct
      )}&page=${page}`;
    } else {
      url += `?page=${page}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error('Error en la petición');

    return res.json();
  } catch (error) {
    throw error;
  }
};

export default fetchApi;
