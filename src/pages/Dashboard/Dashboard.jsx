import './Dashboard.css';
import { Box, Button, Flex, Heading, useToken, VStack } from '@chakra-ui/react';
import { useUser } from '../../Providers/UserContext';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiPower } from 'react-icons/fi';
import Users from './Users';
import ProductsDash from './ProductsDash';
import WorkshopsDash from './WorkshopDash';
import BlogDash from './BlogDash';
import CommentsDash from './CommentsDash';
import OrdersDash from './OrdersDash';
import Statistics from './Statistics';
import MainDashboard from './MainDashboard';
import { DashboardProvider } from '../../Providers/DashboardContext.jsx';
import dashboardRoutes from '../../constants/dashboardRoutes.js';

const Dashboard = () => {
  const navigate = useNavigate();
  const [gray800] = useToken('colors', ['gray.800']);
  const { user } = useUser();
  const [activeBtn, setActiveBtn] = useState('Dashboard');

  const menuItems = [
    'Dashboard',
    'Usuarios',
    'Productos',
    'Talleres',
    'Blog',
    'Comentarios',
    'Pedidos',
    'Estadísticas'
  ];

  return (
    <DashboardProvider>
      <main className='dashboard'>
        <Flex
          as='nav'
          w='calc(100% - 180px)'
          h='5svh'
          bg='gray.800'
          position='relative'
          left='180px'
          top={0}
          align='center'
        >
          <Box
            _before={{
              content: '""',
              position: 'absolute',
              width: '40px',
              height: '40px',
              bottom: '-40px',
              left: '0',
              borderRadius: '50%',
              boxShadow: `-20px -20px 0 ${gray800}`
            }}
          ></Box>
          <Heading fontSize='1rem' textAlign='center' p={5} color='white'>
            Dashboard - Bienvenido {user.name}
          </Heading>
        </Flex>
        <Flex>
          <Box
            w='180px'
            h='100vh'
            mt={5}
            bg='gray.800'
            color='white'
            position='fixed'
            bottom={0}
            left={0}
            zIndex={1}
          >
            <VStack h='100svh' pt='120px' justify='space-between'>
              <VStack spacing={3} w='100%'>
                {menuItems.map((item) => (
                  <Box key={item} w='100%' position='relative' paddingLeft={2}>
                    <Box
                      w='100%'
                      py={2}
                      ml={1}
                      p={2}
                      cursor='pointer'
                      position='relative'
                      bg={activeBtn === item ? 'blue.50' : 'transparent'}
                      color={activeBtn === item ? 'blue.800' : 'white'}
                      borderRadius={activeBtn === item ? '20px' : '0'}
                      outline={activeBtn === item ? '4px solid' : 'none'}
                      outlineColor={activeBtn === item ? '#b4b4dc' : 'none'}
                      _hover={{ color: 'blue.600' }}
                      _before={
                        activeBtn === item
                          ? {
                              content: '""',
                              position: 'absolute',
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              top: '-43px',
                              right: '2px',
                              boxShadow: '10px 10px 0 #b4b4dc',
                              zIndex: '-1'
                            }
                          : {}
                      }
                      _after={
                        activeBtn === item
                          ? {
                              content: '""',
                              position: 'absolute',
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              bottom: '-43px',
                              right: '2px',
                              boxShadow: '10px -10px 0 #b4b4dc',
                              zIndex: '-1'
                            }
                          : {}
                      }
                      onClick={() => {
                        setActiveBtn(item);
                        const path = dashboardRoutes[item];
                        if (path) navigate(path);
                      }}
                    >
                      {item}
                    </Box>
                  </Box>
                ))}
              </VStack>
              <Button
                variant='solid'
                colorScheme='whiteAlpha'
                mb={6}
                mx={4}
                border='1px solid red'
                leftIcon={<FiPower size='20px' />}
                onClick={() => {
                  navigate('/products', { replace: true });
                }}
              >
                Salir
              </Button>
            </VStack>
          </Box>
          <Box
            width='calc(100% - 200px)'
            minH='calc(100vh - 5svh)'
            marginTop='5svh'
          >
            <Routes>
              <Route index element={<MainDashboard />} />
              <Route path='users' element={<Users />} />
              <Route path='products' element={<ProductsDash />} />
              <Route path='workshops' element={<WorkshopsDash />} />
              <Route path='blog' element={<BlogDash />} />
              <Route path='comments' element={<CommentsDash />} />
              <Route path='orders' element={<OrdersDash />} />
              <Route path='statistics' element={<Statistics />} />
            </Routes>
          </Box>
        </Flex>
      </main>
    </DashboardProvider>
  );
};

export default Dashboard;
