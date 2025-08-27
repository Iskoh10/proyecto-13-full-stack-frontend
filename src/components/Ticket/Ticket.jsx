import { Box, Divider, Flex, Image, Text } from '@chakra-ui/react';
import OrderTable from '../OrderTable/OrderTable';
import TaxTable from '../TaxTable/TaxTable';
import formatDate from '../../utils/formatDate';

const Ticket = ({ order, isModal = false }) => {
  return (
    <Box
      mt={8}
      p={5}
      border='1px solid rgba(0,0,0,0.2)'
      borderRadius='10px'
      bg='rgba(243, 244, 246, 0.7)'
      width={isModal ? '100%' : '30%'}
      boxShadow='sm'
    >
      <Flex direction='column' align='center'>
        <Image src='/favicon.png' alt='logo' boxSize='50px' />
        <Text fontWeight='bold' color='isc.secondary' mb={4}>
          La Panadería
        </Text>
        <Text>C/Buena Miga, 10 41012 Sevilla</Text>
        <Text>NIF: B12345678</Text>
      </Flex>
      <Divider borderColor='gray.400' borderWidth='2px' />

      <Flex direction='column' align='center' py={2}>
        <Text color='isc.darkAccent'>Datos del Cliente</Text>
        <Flex gap={2}>
          <Text>{order.customer.name}</Text>
          <Text>{order.customer.lastName}</Text>
        </Flex>
        <Text>{order.customer.address}</Text>
        <Text>Tlf: {order.customer.phone}</Text>
        <Text>Email: {order.customer.email}</Text>
      </Flex>
      <Divider borderColor='gray.400' borderWidth='2px' />

      <Flex direction='column' align='center' py={2}>
        <Text color='isc.darkAccent'>Ticket de Compra</Text>
        <Text mb={4} textAlign='center'>
          Num. Pedido: {order._id}
        </Text>
        <Text>Fecha: {formatDate(order.deliveryDate, true)}</Text>
      </Flex>
      <Divider borderColor='gray.400' borderWidth='2px' />

      <Flex direction='column' align='center'>
        <OrderTable items={order.items} />

        <Text ml='auto'>Total: €{order.totalPrice.toFixed(2)}</Text>

        <TaxTable items={order.items} />
        <Divider borderColor='gray.400' borderWidth='2px' />

        <Box mt={4} p={4} border='1px solid red' borderRadius='md'>
          <Text>Dia de Entrega: {order.notes}</Text>
        </Box>

        <Text fontWeight='bold' color='isc.secondary' mt={2}>
          La Panadería
        </Text>
        <Text>lapanaderia.com</Text>
        <Text as='span' color='red.500' fontWeight='bold'>
          -
        </Text>
        <Text>Tlf: 951234567</Text>
      </Flex>
    </Box>
  );
};

export default Ticket;
