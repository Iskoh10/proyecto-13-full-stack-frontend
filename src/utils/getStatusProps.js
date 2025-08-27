const getStatusProps = (status) => {
  switch (status) {
    case 'pending':
      return { text: 'Pendiente', color: 'blue.400' };
    case 'delivered':
      return { text: 'Entregado', color: 'green.400' };
    case 'cancelled':
      return { text: 'Cancelado', color: 'red.400' };
    default:
      return status;
  }
};

export default getStatusProps;
