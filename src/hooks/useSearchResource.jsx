const useSearchResource = ({
  inputRef,
  setLoading,
  resource,
  setItems,
  showToast
}) => {
  const handleSearch = async () => {
    const search = inputRef.current.value;
    if (!search.trim()) return;

    try {
      setLoading((prev) => ({ ...prev, [resource]: true }));

      let url;

      if (resource === 'products') {
        url = new URL('http://localhost:3000/api/v1/products/filter');
        if (!isNaN(search)) {
          url.searchParams.append('price', search);
        } else {
          url.searchParams.append('nameProduct', search);
        }
      } else if (resource === 'users') {
        url = new URL(`http://localhost:3000/api/v1/users/by-name/${search}`);
      } else {
        url = new URL(
          `http://localhost:3000/api/v1/${resource}/filter/${search}`
        );
      }

      const res = await fetch(url.toString(), {
        credentials: 'include'
      });

      if (!res.ok) throw new Error('Error en la búsqueda');
      const data = await res.json();

      if (data.length === 0) {
        showToast({
          description: 'No se encontró ningún post.',
          status: 'info'
        });
        inputRef.current.value = '';
        return;
      }

      setItems(data);
      inputRef.current.value = '';
    } catch (error) {
      inputRef.current.value = '';
      showToast({
        title: 'Error',
        description: 'Error en la búsqueda.',
        status: 'error'
      });
    } finally {
      setLoading((prev) => ({ ...prev, [resource]: false }));
    }
  };
  return { handleSearch };
};

export default useSearchResource;
