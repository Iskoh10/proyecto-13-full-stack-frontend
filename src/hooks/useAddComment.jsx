const useAddComment = ({
  commentRef,
  setLoadingComment,
  selectedWorkshop,
  setSelectedWorkshop,
  setWorkshops,
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
      const res = await fetch('http://localhost:3000/api/v1/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          text,
          target: 'Workshop',
          eventId: selectedWorkshop._id
        })
      });

      if (!res.ok) throw new Error('Error al crear el comentario');

      const createdComment = await res.json();

      setSelectedWorkshop((prev) => ({
        ...prev,
        comments: [...prev.comments, createdComment]
      }));

      setWorkshops((prev) =>
        prev.map((workshop) =>
          workshop._id === selectedWorkshop._id
            ? { ...workshop, comments: [...workshop.comments, createdComment] }
            : workshop
        )
      );

      commentRef.current.value = '';
    } catch (error) {
      console.log(error);

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
