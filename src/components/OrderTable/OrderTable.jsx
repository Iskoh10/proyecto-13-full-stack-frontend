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
              <Td textAlign='center'>{item.product.nameProduct}</Td>
              <Td textAlign='center'>€{item.product.price}</Td>
              <Td textAlign='center'>€{item.product.price * item.quantity}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
