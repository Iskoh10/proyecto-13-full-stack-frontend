const deleteAccount = async ({
  setIsDeleting,
  setUser,
  showToast,
  onDeleteClose,
  navigate
}) => {
  setIsDeleting(true);

  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/deleteUser`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({})
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Error al eliminar la cuenta');

    setUser(null);
    showToast({
      title: 'Cuenta Eliminada',
      description: data.message || 'Cuenta eliminada con éxito',
      status: 'success'
    });

    navigate('/login', { replace: true });
  } catch (error) {
    showToast({
      title: 'Error al eliminar la cuenta ',
      description: error.message || 'Inténtalo de nuevo más tarde',
      status: 'error'
    });
  } finally {
    setIsDeleting(false);
    onDeleteClose();
  }
};

export default deleteAccount;
