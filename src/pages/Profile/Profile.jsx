import './Profile.css';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { useUser } from '../../Providers/UserContext';
import { useEffect, useReducer, useState } from 'react';
import EditFieldModal from '../../components/EditFieldModal/EditFieldModal';
import userReducer from '../../reducers/userReducer';
import profileFields from '../../data/profileFields';
import EditableField from '../../components/EditableField/EditableField';
import formatDate from '../../utils/formatDate';
import Ticket from '../../components/Ticket/Ticket';
import CustomModal from '../../components/CustomModal/CustomModal';
import { useNavigate } from 'react-router-dom';
import useCustomToast from '../../hooks/useCustomToast';

const Profile = () => {
  const { user, setUser } = useUser();
  const [activeTab, setActiveTab] = useState('perfil');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose
  } = useDisclosure();
  const [fieldToEdit, setFieldToEdit] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useCustomToast();

  const [state, dispatch] = useReducer(userReducer, {
    name: user?.name || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    address: user?.address || '',
    phone: user?.phone || ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/v1/auth/me', {
          credentials: 'include'
        });
        if (!res.ok) throw new Error('No se pudo cargar el usuario');
        const data = await res.json();
        setUser(data.user);
        dispatch({ type: 'SET_USER', user: data.user });
      } catch (error) {
        showToast({
          title: 'Error al cargar tu perfil',
          description: error.message || 'Inténtalo de nuevo más tarde.',
          status: 'error'
        });
      }
    };

    fetchUser();
  }, [setUser]);

  useEffect(() => {
    if (user) {
      dispatch({ type: 'SET_USER', user });
    }
  }, [user]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/v1/orders/my-orders`,
          {
            method: 'GET',
            credentials: 'include'
          }
        );

        if (!res.ok) {
          showToast({
            title: 'Error al obtener tus pedidos',
            description: 'Inténtalo de nuevo más tarde.',
            status: 'error'
          });
          return;
        }

        const data = await res.json();
        setOrders(data);
      } catch (error) {
        showToast({
          title: 'Error en el servidor',
          description: error.message || 'Inténtalo de nuevo más tarde.',
          status: 'error'
        });
      }
    };
    fetchOrders();
  }, []);

  if (!user) return <p>No has iniciado sesión</p>;

  const handleFieldClick = (key, label) => {
    setFieldToEdit({ key, label });
    onOpen();
  };

  const handleUpdate = async (field, value) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });

    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/users/${user._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ [field]: value })
        }
      );

      if (!res.ok) throw new Error('No se pudo actualizar');

      const resData = await res.json();
      const updatedUser = resData.user;

      if (field !== 'password') {
        dispatch({ type: 'SET_USER', user: updatedUser });
        setUser(updatedUser);
      }

      showToast({
        title: 'Usuario actualizado',
        description: `${field} actualizado correctamente`,
        status: 'success'
      });
    } catch (error) {
      showToast({
        title: 'Error al actualizar usuario',
        description: error.message || 'Inténtalo de nuevo más tarde.',
        status: 'error'
      });
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);

    try {
      const res = await fetch('http://localhost:3000/api/v1/users/deleteUser', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message || 'Error al eliminar la cuenta');

      setUser(null);
      showToast({
        title: 'Cuenta Eliminada',
        description: data.message || 'Cuenta eliminada con éxito',
        status: 'success'
      });
      navigate('/login', { replace: true });
    } catch (error) {
      showToast({
        title: 'Error al eliminar la cuenta ',
        description: error.message || 'Inténtalo de nuevo más tarde',
        status: 'error'
      });
    } finally {
      setIsDeleting(false);
      onDeleteClose();
    }
  };

  return (
    <main className='profile flex-container'>
      <Flex align='flex-start' direction='row' w='100%'>
        <Box
          as='aside'
          w='250px'
          h='100svh'
          p={4}
          bg='gray.100'
          border='1px solid'
          borderColor='gray.300'
        >
          <Flex
            direction='column'
            border='1px solid'
            borderColor='gray.300'
            mb={5}
          >
            <Text as='p'>{state.name + ' ' + state.lastName}</Text>
            <Text as='p'>{state.email}</Text>
          </Flex>
          <Flex direction='column'>
            <Box
              as='button'
              w='100%'
              textAlign='left'
              mb={2}
              p={2}
              bg={activeTab === 'perfil' ? 'gray.400' : 'transparent'}
              _hover={{ bg: 'gray.500' }}
              onClick={() => setActiveTab('perfil')}
            >
              Perfil
            </Box>
            <Box
              as='button'
              w='100%'
              textAlign='left'
              mb={2}
              p={2}
              bg={activeTab === 'historial' ? 'gray.400' : 'transparent'}
              _hover={{ bg: 'gray.500' }}
              onClick={() => setActiveTab('historial')}
            >
              Historial Pedidos
            </Box>
          </Flex>
        </Box>
        <Box flex='1' ml={6} bg='rgb(230, 185, 103)' p={4} h='100svh'>
          <Heading pb={4}>{`Bienvenido ${state.name}`}</Heading>

          {activeTab === 'perfil' && (
            <Flex direction='column' align='center' gap={5}>
              <h2>Actualizar datos personales</h2>

              <Flex
                as='form'
                w='30%'
                direction='column'
                align='center'
                p={5}
                gap={5}
                bg='gray.200'
                border='1px solid'
                borderColor='gray.300'
                borderRadius='10px'
              >
                {profileFields.map(({ key, label }) => (
                  <EditableField
                    key={key}
                    label={label}
                    value={state[key]}
                    onClick={() => handleFieldClick(key, label)}
                  />
                ))}

                {fieldToEdit && (
                  <EditFieldModal
                    field={fieldToEdit.label}
                    fieldValue={state[fieldToEdit.key]}
                    isOpen={isOpen}
                    onClose={onClose}
                    onSubmitField={(value) =>
                      handleUpdate(fieldToEdit.key, value)
                    }
                  />
                )}
              </Flex>
              {user?.role === 'admin' ? null : (
                <Button colorScheme='red' onClick={onDeleteOpen}>
                  Eliminar cuenta
                </Button>
              )}

              <CustomModal isOpen={isDeleteOpen} onClose={onDeleteClose}>
                <Flex direction='column' textAlign='center' mt={5}>
                  <Text>¿Estás seguro de que quieres eliminar tu cuenta?</Text>
                  <Flex justify='center'>
                    <Button variant='ghost' mr={3} onClick={onDeleteClose}>
                      Cancelar
                    </Button>
                    <Button
                      colorScheme='red'
                      isLoading={isDeleting}
                      onClick={handleDeleteAccount}
                    >
                      Eliminar
                    </Button>
                  </Flex>
                </Flex>
              </CustomModal>
            </Flex>
          )}
          {activeTab === 'historial' && (
            <Flex direction='column' align='center' gap={5}>
              <h2>Pedidos Realizados</h2>
              <Flex height='400px' overflowY='auto' direction='column' gap={2}>
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
                      <Text>Total: €{order.totalPrice.toFixed(2)}</Text>
                      <Text>{order.items.length} productos</Text>
                    </Flex>
                  ))}
                <CustomModal isOpen={isOpen} onClose={onClose}>
                  <Box id='ticketToPrint'>
                    {selectedOrder && (
                      <Ticket order={selectedOrder} isModal={true} />
                    )}
                  </Box>

                  <Button onClick={() => window.print()} mt={2}>
                    Descargar PDF
                  </Button>
                </CustomModal>
              </Flex>
            </Flex>
          )}
        </Box>
      </Flex>
    </main>
  );
};

export default Profile;
