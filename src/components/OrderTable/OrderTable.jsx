import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';

const OrderTable = ({ items }) => {
  return (
    <TableContainer m={2}>
      <Table variant='striped' colorScheme='orange' size='sm'>
        <Thead>
          <Tr>
            <Th textAlign='center'>Cantidad</Th>
            <Th textAlign='center'>Producto</Th>
            <Th textAlign='center'>Precio</Th>
            <Th textAlign='center'>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr key={item._id}>
              <Td textAlign='center'>{item.quantity}</Td>
              <Td textAlign='center'>
                {item.product ? item.product.nameProduct : 'Producto eliminado'}
              </Td>
              <Td textAlign='center'>
                €{item.product ? item.product.price : 0}
              </Td>
              <Td textAlign='center'>
                €{item.product ? item.product.price * item.quantity : 0}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
