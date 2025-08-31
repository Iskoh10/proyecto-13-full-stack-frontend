const getDisplayText = (filters) => {
  switch (filters.typeProduct) {
    case 'panaderia':
      return 'Panadería';
    case 'bolleria':
      return 'Bollería';
    case 'pasteleria':
      return 'Pastelería';
    case 'allProducts':
      return 'Todos los productos';
    default:
      return 'Selecciona una opción';
  }
};

export default getDisplayText;
