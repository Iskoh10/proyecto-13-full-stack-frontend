import './MainDashboard.css';
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  Spinner,
  Text
} from '@chakra-ui/react';
import HeadingDash from '../../components/HeadingDash/HeadingDash';
import {
  FaClipboardList,
  FaListAlt,
  FaMoneyBillWave,
  FaUserCheck
} from 'react-icons/fa';
import { useDashboard } from '../../Providers/DashboardContext';
import formatDate from '../../utils/formatDate';
import getStatusProps from '../../utils/getStatusProps';
import getOrdersThisMonth from '../../utils/getOrdersThisMonth';

const MainDashboard = () => {
  const { orders, users, loading } = useDashboard();
  const ordersThisMonth = getOrdersThisMonth(orders);

  if (loading.orders || loading.users) return <Spinner size='sm' />;

  return (
    <section className='main-dashboard'>
      <HeadingDash>Dashboard Principal</HeadingDash>

      <Grid templateColumns='repeat(12, 1fr)' gap={10}>
        <GridItem colSpan={{ base: 12, md: 4 }}>
          <Flex
            w='100%'
            h='10svh'
            bg='white'
            borderRadius='10px'
            p={5}
            align='center'
          >
            <Icon as={FaClipboardList} boxSize={12}></Icon>
            <Flex direction='column' ml={5}>
              <Text fontSize='2rem' color='isc.darkAccent'>
                {ordersThisMonth.length}
              </Text>
              <Text>Pedidos este mes</Text>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={{ base: 12, md: 4 }}>
          <Flex
            w='100%'
            h='10svh'
            bg='white'
            borderRadius='10px'
            p={5}
            align='center'
          >
            <Icon as={FaUserCheck} boxSize={12}></Icon>
            <Flex direction='column' ml={5}>
              <Text fontSize='2rem' color='isc.darkAccent'>
                {users.users?.length}
              </Text>
              <Text>Clientes registrados</Text>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={{ base: 12, md: 3 }}>
          <Flex
            w='100%'
            h='10svh'
            bg='white'
            borderRadius='10px'
            p={5}
            align='center'
          >
            <Icon as={FaMoneyBillWave} boxSize={12}></Icon>
            <Flex direction='column' ml={5}>
              <Text fontSize='2rem' color='isc.darkAccent'>
                €
                {ordersThisMonth
                  .reduce((acc, order) => acc + order.totalPrice, 0)
                  .toFixed(2)}
                {console.log()}
              </Text>
              <Text>Total Ventas</Text>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={{ base: 12, md: 12 }}>
          <Flex
            w='100%'
            bg='white'
            borderRadius='10px'
            p={5}
            direction='column'
            gap={5}
          >
            <Flex align='center'>
              <Icon as={FaListAlt} boxSize={12}></Icon>
              <Flex direction='column' ml={5}>
                <Text>Pedidos Recientes</Text>
              </Flex>
            </Flex>

            <Flex direction='column'>
              <Flex w='100%' justify='space-around'>
                <Text flex='1' textAlign='left'>
                  Nombre
                </Text>
                <Text flex='1' textAlign='left'>
                  Fecha pedido
                </Text>
                <Text flex='1' textAlign='left'>
                  Estado
                </Text>
              </Flex>
              <Divider borderColor='black' mb={10} />

              {orders.slice(-10).map((order, index) => {
                const { text, color } = getStatusProps(order.status);
                const bgColor = index % 2 === 0 ? 'white' : 'gray.100';

                return (
                  <Flex
                    key={order._id}
                    w='100%'
                    justify='space-around'
                    align='center'
                    borderRadius='10px'
                    p={2}
                    bg={bgColor}
                    _hover={{ bg: 'gray.200' }}
                  >
                    <Text flex='1' textAlign='left'>
                      {order.customer.name} {order.customer.lastName}
                    </Text>
                    <Text flex='1' textAlign='left'>
                      {formatDate(order.deliveryDate, true)}
                    </Text>
                    <Box
                      flex='1'
                      textAlign='left'
                      bg={color}
                      borderRadius='10px'
                      p={2}
                    >
                      {text}
                    </Box>
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </section>
  );
};

export default MainDashboard;
