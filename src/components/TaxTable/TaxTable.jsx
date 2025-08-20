import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';

const TaxTable = ({ items }) => {
  let base4 = 0;
  let base21 = 0;

  items.forEach((item) => {
    const total = item.quantity * item.product.price;
    if (item.typeProduct === 'panaderia') {
      base4 += total;
    } else {
      base21 += total;
    }
  });

  const cuota4 = (base4 * 4) / 100;
  const cuota21 = (base21 * 21) / 100;

  return (
    <TableContainer mt={4}>
      <Table variant='striped' colorScheme='orange' size='sm'>
        <Thead>
          <Tr>
            <Th textAlign='center'>IVA</Th>
            <Th textAlign='center'>Base Imp.</Th>
            <Th textAlign='center'>Cuota</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td textAlign='center'>4%</Td>
            <Td textAlign='center'>€{base4.toFixed(2)}</Td>
            <Td textAlign='center'>€{cuota4.toFixed(2)}</Td>
          </Tr>
          <Tr>
            <Td textAlign='center'>21%</Td>
            <Td textAlign='center'>€{base21.toFixed(2)}</Td>
            <Td textAlign='center'>€{cuota21.toFixed(2)}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TaxTable;
