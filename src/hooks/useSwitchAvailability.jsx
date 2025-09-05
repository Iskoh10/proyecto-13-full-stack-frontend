const useSwitchAvailability = ({ resource, setItems, showToast }) => {
  const handleSwitch = async (itemId, currentValue) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/${resource}/${itemId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ available: !currentValue })
        }
      );

      if (!res.ok) throw new Error('Error en la actualización.');
      const data = await res.json();

      setItems((prev) => {
        if (resource === 'products') {
          return {
            ...prev,
            products: prev.products.map((p) =>
              p._id === itemId ? { ...p, available: !p.available } : p
            )
          };
        }

        return prev.map((p) =>
          p._id === itemId ? { ...p, available: data.available } : p
        );
      });

      showToast({
        title: 'Éxito',
        description: 'Disponibilidad actualizada.',
        status: 'success'
      });
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'No se pudo completar la acción.',
        status: 'error'
      });
    }
  };
  return { handleSwitch };
};

export default useSwitchAvailability;
