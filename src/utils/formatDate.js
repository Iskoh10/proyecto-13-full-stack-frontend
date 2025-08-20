const formatDate = (dateString, shortVersion = false) => {
  const dateObj = new Date(dateString);
  const datePart = dateObj.toLocaleDateString('es-ES');
  const timePart = dateObj.toLocaleTimeString('es-Es', { hour12: false });

  return shortVersion ? datePart : `${datePart} ${timePart}`;
};

export default formatDate;
