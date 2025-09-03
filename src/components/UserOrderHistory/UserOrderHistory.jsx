import { Box, Button, Flex, Text } from '@chakra-ui/react';
import formatDate from '../../utils/formatDate';
import CustomModal from '../CustomModal/CustomModal';
import Ticket from '../Ticket/Ticket';

const UserOrderHistory = ({
  orders,
  selectedOrder,
  setSelectedOrder,
  onOpen,
  isOpen,
  onClose
}) => {
  return (
    <Flex
      height={{ base: '600px', md: '400px' }}
      overflowY='auto'
      direction='column'
      gap={2}
    >
      {orders
        .slice()
        .reverse()
        .map((order) => (
          <Flex
            key={order._id}
            p={2}
            gap={4}
            bg={
              order.status === 'pending'
                ? 'blue.100'
                : order.status === 'delivered'
                ? 'green.200'
                : order.status === 'cancelled'
                ? 'red.200'
                : 'blue.100'
            }
            border='1px solid'
            borderColor='gray.400'
            borderRadius='10px'
            cursor='pointer'
            align='center'
            _hover={{
              bg:
                order.status === 'pending'
                  ? 'blue.200'
                  : order.status === 'delivered'
                  ? 'green.300'
                  : order.status === 'cancelled'
                  ? 'red.300'
                  : 'blue.200',
              transition: 'background-color 0.3s'
            }}
            onClick={() => {
              setSelectedOrder(order);
              onOpen();
            }}
          >
            <Text>{formatDate(order.deliveryDate, true)}</Text>
            <Text textAlign='center'>
              Total: €{order.totalPrice.toFixed(2)}
            </Text>
            <Text textAlign='center'>{order.items.length} productos</Text>
          </Flex>
        ))}
      <CustomModal isOpen={isOpen} onClose={onClose}>
        <Box id='ticketToPrint'>
          {selectedOrder && <Ticket order={selectedOrder} isModal={true} />}
        </Box>

        <Button onClick={() => window.print()} mt={2}>
          Descargar PDF
        </Button>
      </CustomModal>
    </Flex>
  );
};

export default UserOrderHistory;
