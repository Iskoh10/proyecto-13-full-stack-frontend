const updateUser = async ({
  field,
  value,
  dispatch,
  user,
  setUser,
  showToast
}) => {
  dispatch({ type: 'UPDATE_FIELD', field, value });

  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/${user._id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ [field]: value })
      }
    );

    if (!res.ok) throw new Error('No se pudo actualizar');

    const resData = await res.json();
    const updatedUser = resData.user;

    if (field !== 'password') {
      dispatch({ type: 'SET_USER', user: updatedUser });
      setUser(updatedUser);
    }

    showToast({
      title: 'Usuario actualizado',
      description: `${field} actualizado correctamente`,
      status: 'success'
    });
  } catch (error) {
    showToast({
      title: 'Error al actualizar usuario',
      description: error.message || 'Inténtalo de nuevo más tarde.',
      status: 'error'
    });
  }
};

export default updateUser;
