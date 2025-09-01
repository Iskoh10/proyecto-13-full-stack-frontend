import { useMemo } from 'react';

const useVote = ({
  setItems,
  selectedItem,
  setSelectedItem,
  showToast,
  user
}) => {
  const handleVote = async (section, action) => {
    if (!user) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/${section}/${selectedItem._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ action })
        }
      );

      if (!res.ok) throw new Error('Error al votar');

      const updatedItem = await res.json();

      setItems((prev) =>
        prev.map((item) => (item._id === updatedItem._id ? updatedItem : item))
      );

      if (selectedItem?._id === updatedItem._id) {
        let itemToSet = updatedItem;

        if (section === 'blogs' && updatedItem.body) {
          itemToSet = {
            ...updatedItem,
            paragraphs: updatedItem.body.replace(/\\n/g, '\n').split('\n\n')
          };
        }
        setSelectedItem(itemToSet);
      }

      showToast({
        description: 'Votaste correctamente',
        status: 'success'
      });
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'No se pudo registrar tu voto',
        status: 'error'
      });
    }
  };

  const hasVote = useMemo(() => {
    if (!selectedItem || !user) return false;
    return (
      selectedItem.likes.some((u) => u._id === user._id) ||
      selectedItem.dislikes.some((u) => u._id === user._id)
    );
  }, [selectedItem, user]);

  return { handleVote, hasVote };
};

export default useVote;
