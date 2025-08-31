import { useMemo } from 'react';

const useAttend = ({
  user,
  setWorkshops,
  selectedWorkshop,
  setSelectedWorkshop,
  showToast
}) => {
  const handleAttend = async (workshopId, action) => {
    if (!user) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/workshops/${workshopId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ action })
        }
      );

      if (!res.ok) throw new Error('Error en la petición de asistencia.');

      const data = await res.json();

      setWorkshops((prev) =>
        prev.map((workshop) => (workshop._id === data._id ? data : workshop))
      );

      if (selectedWorkshop?._id === data._id) {
        setSelectedWorkshop(data);
      }

      if (action === 'attend') {
        showToast({
          title: 'Info',
          description: 'Te confirmaremos tu asistencia!',
          status: 'info'
        });
      } else if (action === 'unattend') {
        showToast({
          description: 'Te quitaste del taller correctamente.',
          status: 'success'
        });
      }
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'No te pudiste apuntar, inténtalo de nuevo',
        status: 'error'
      });
    }
  };

  const isAttending = useMemo(() => {
    if (!selectedWorkshop || !user) return false;
    return (
      selectedWorkshop?.attendees?.some(
        (attendee) => attendee._id === user?._id
      ) || false
    );
  }, [selectedWorkshop, user]);

  return { handleAttend, isAttending };
};

export default useAttend;
