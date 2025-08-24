const getStatusProps = (status) => {
  switch (status) {
    case 'pending':
      return { text: 'Pendiente', color: 'blue.400' };
    case { text: 'delivered', color: 'green.400' }:
      return { text: 'Entregado', color: 'red.400' };
    case 'cancelled':
      return 'Cancelado';

    default:
      return status;
  }
};

export default getStatusProps;
