import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import HeadingDash from '../../components/HeadingDash/HeadingDash';
import { useDashboard } from '../../Providers/DashboardContext';
import { useState } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import getOrdersThisMonth from '../../utils/getOrdersThisMonth';
import formatDate from '../../utils/formatDate';
import getStatusProps from '../../utils/getStatusProps';
import useCustomToast from '../../hooks/useCustomToast';
import CustomModal from '../../components/CustomModal/CustomModal';
import Ticket from '../../components/Ticket/Ticket';

const OrdersDash = () => {
  const { orders, setOrders, fetchResources } = useDashboard();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ordersThisMonth = getOrdersThisMonth(orders);
  const { showToast } = useCustomToast();

  const handleChangeStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/orders/${orderId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ status: newStatus })
        }
      );

      if (!res.ok) throw new Error('No se pudo actualizar el estado');
      const updatedOrder = await res.json();

      fetchResources(
        'http://localhost:3000/api/v1/orders',
        setOrders,
        'orders'
      );
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'Error en la actualización del estado.',
        status: 'error'
      });
    }
  };

  const searchByCategory = async (status) => {
    try {
      let res;

      if (status === 'allOrders') {
        res = await fetch('http://localhost:3000/api/v1/orders', {
          credentials: 'include'
        });
      } else {
        res = await fetch(
          `http://localhost:3000/api/v1/orders/filter/${status}`,
          {
            credentials: 'include'
          }
        );
      }

      if (!res.ok) throw new Error('Error en la búsqueda');
      const data = await res.json();

      setOrders(data);
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'Seleccion correcta',
        status: 'error'
      });
    }
  };

  return (
    <section className='main-dashboard'>
      <HeadingDash>Pedidos</HeadingDash>
      <Flex gap={10} align='center' mb={10}>
        <Flex
          h='10svh'
          bg='white'
          borderRadius='10px'
          p={5}
          align='center'
          w='25%'
        >
          <Icon as={FaClipboardList} boxSize={12} color='blue.500' />
          <Flex direction='column' ml={5}>
            <Text fontSize='2rem' color='isc.darkAccent'>
              {
                ordersThisMonth.filter?.((order) => !order.customer.isDeleted)
                  .length
              }
            </Text>
            <Text>Pedidos este mes</Text>
          </Flex>
        </Flex>
        <Flex
          p={3}
          w='700px'
          justify='space-between'
          bg='white'
          borderRadius='10px'
        >
          <Button
            bg='gray.400'
            borderRadius='10px'
            p={2}
            value='allOrders'
            _hover={{ bg: 'gray.200' }}
            fontWeight='default'
            cursor='pointer'
            onClick={(e) => searchByCategory(e.currentTarget.value)}
          >
            Todos
          </Button>
          <Button
            bg='blue.400'
            borderRadius='10px'
            p={2}
            value='pending'
            _hover={{ bg: 'blue.200' }}
            fontWeight='default'
            cursor='pointer'
            onClick={(e) => searchByCategory(e.currentTarget.value)}
          >
            Pendientes
          </Button>
          <Button
            bg='green.400'
            borderRadius='10px'
            p={2}
            value='delivered'
            _hover={{ bg: 'green.200' }}
            fontWeight='default'
            cursor='pointer'
            onClick={(e) => searchByCategory(e.currentTarget.value)}
          >
            Entregados
          </Button>
          <Button
            bg='red.400'
            borderRadius='10px'
            p={2}
            value='cancelled'
            _hover={{ bg: 'red.200' }}
            fontWeight='default'
            cursor='pointer'
            onClick={(e) => searchByCategory(e.currentTarget.value)}
          >
            Cancelados
          </Button>
        </Flex>
      </Flex>

      <Flex bg='white' borderRadius='10px' p={5} direction='column' gap={2}>
        <Flex justify='space-between' mb='10'>
          <Box w='22%'>
            <Text>Fecha</Text>
          </Box>
          <Box w='22%'>
            <Text>Cliente</Text>
          </Box>
          <Box w='22%'>
            <Text>Tlf</Text>
          </Box>
          <Box flex='1'>
            <Text>Status</Text>
          </Box>
          <Box flex='1'>
            <Text textAlign='right'>Fecha entrega</Text>
          </Box>
        </Flex>

        {orders
          .filter?.((order) => !order.customer.isDeleted)
          .map((order, index) => {
            const { text, color } = getStatusProps(order.status);
            const bgOrders = index % 2 === 0 ? 'gray.200' : 'white';
            return (
              <Flex
                key={order._id}
                bg={bgOrders}
                align='center'
                _hover={{ bg: 'gray.300' }}
                cursor='pointer'
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedOrder(order);
                  onOpen();
                }}
              >
                <Box w='22%'>
                  <Text>{formatDate(order.createdAt, true)}</Text>
                </Box>

                <Box w='22%'>
                  <Text>
                    {order.customer.name} {order.customer.lastName}
                  </Text>
                </Box>
                <Box w='20%'>
                  <Text>{order.customer.phone}</Text>
                </Box>
                <Menu>
                  <MenuButton
                    align='center'
                    bg={color}
                    w='11%'
                    mr={5}
                    borderRadius='10px'
                    p={1}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Text>{text}</Text>
                  </MenuButton>
                  <MenuList>
                    {['pending', 'delivered', 'cancelled'].map((status) => (
                      <MenuItem
                        key={status}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChangeStatus(order._id, status);
                        }}
                      >
                        {status}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>

                <Box flex='1'>
                  <Text textAlign='right'>{order.notes}</Text>
                </Box>
              </Flex>
            );
          })}
        <CustomModal isOpen={isOpen} onClose={onClose}>
          <Box id='ticketToPrint'>
            {selectedOrder && <Ticket order={selectedOrder} isModal={true} />}
          </Box>

          <Button onClick={() => window.print()} mt={2}>
            Descargar PDF
          </Button>
        </CustomModal>
      </Flex>
    </section>
  );
};

export default OrdersDash;
