const useAddComment = ({
  commentRef,
  target,
  setLoadingComment,
  selectedItem,
  setSelectedItem,
  setItems,
  showToast
}) => {
  const handleAddComment = async () => {
    const text = commentRef.current.value;
    if (!text.trim()) {
      commentRef.current.value = '';
      return;
    }

    setLoadingComment(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            text,
            target: target,
            eventId: selectedItem._id
          })
        }
      );

      if (!res.ok) throw new Error('Error al crear el comentario');

      const createdComment = await res.json();

      setSelectedItem((prev) => ({
        ...prev,
        comments: [...prev.comments, createdComment]
      }));

      setItems((prev) =>
        prev.map((item) =>
          item._id === selectedItem._id
            ? { ...item, comments: [...item.comments, createdComment] }
            : item
        )
      );

      commentRef.current.value = '';
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'Error al comentar',
        status: 'error'
      });
    } finally {
      setLoadingComment(false);
    }
  };
  return { handleAddComment };
};

export default useAddComment;
