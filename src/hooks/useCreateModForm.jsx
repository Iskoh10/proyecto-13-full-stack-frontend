const useCreateModForm = ({
  user,
  reset,
  setImageFiles,
  setSelectedItem,
  onCloseNewItem,
  fetchResources,
  setItems,
  showToast,
  setLoading
}) => {
  const onSubmit = async ({
    data,
    imageFiles,
    target,
    typeProduct = '',
    selectedItem,
    targetText
  }) => {
    const formData = new FormData();
    formData.append('description', data.description);
    formData.append('available', data.available);
    formData.append('user', user._id);

    if (target === 'products') {
      formData.append('nameProduct', data.nameProduct);
      formData.append('productImage', imageFiles[0]);
      formData.append('price', Number(data.price));
      formData.append('stock', Number(data.stock));
      formData.append('typeProduct', typeProduct);
    } else if (target === 'workshops') {
      formData.append('title', data.title);
      formData.append('image', imageFiles[0]);
      formData.append('eventDate', data.eventDate);
      formData.append('capacity', data.capacity);
    } else if (target === 'blogs') {
      formData.append('title', data.title);
      formData.append('summary', data.summary);
      formData.append('body', data.body);
      formData.append('slug', data.slug);

      imageFiles.forEach((file) => formData.append('image', file));
    }

    try {
      setLoading((prev) => ({ ...prev, [target]: true }));
      const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1`;
      const url = selectedItem
        ? `${API_URL}/${target}/${selectedItem._id}`
        : `${API_URL}/${target}`;

      const method = selectedItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        credentials: 'include',
        body: formData
      });

      if (!res.ok)
        throw new Error(`Error creando/actualizando el ${targetText}.`);

      reset();
      setImageFiles([]);
      setSelectedItem(null);
      onCloseNewItem();
      fetchResources(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/${target}`,
        setItems,
        target
      );

      showToast({
        description: selectedItem
          ? `${targetText} actualizado correctamente.`
          : `${targetText} creado correctamente.`,
        status: 'success'
      });
    } catch (error) {
      showToast({
        title: 'Error',
        description: `No se pudo guardar el ${targetText}`,
        status: 'error'
      });
    } finally {
      setLoading((prev) => ({ ...prev, [target]: false }));
    }
  };

  return { onSubmit };
};

export default useCreateModForm;
