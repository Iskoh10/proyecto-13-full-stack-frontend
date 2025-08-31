import './Profile.css';
import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { useUser } from '../../Providers/UserContext';
import { useEffect, useReducer, useState } from 'react';
import userReducer from '../../reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import useCustomToast from '../../hooks/useCustomToast';
import ProfileAside from '../../components/ProfileAside/ProfileAside';
import UpdateUserForm from '../../components/UpdateUserForm/UpdateUserForm';
import UserOrderHistory from '../../components/UserOrderHistory/UserOrderHistory';
import DeleteAccountModal from '../../components/DeleteAccountModal/DeleteAccountModal';

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
        <ProfileAside
          state={state}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Box flex='1' ml={6} bg='isc.accent' p={4} h='100svh'>
          <Heading pb={4}>{`Bienvenido ${state.name}`}</Heading>

          {activeTab === 'perfil' && (
            <Flex direction='column' align='center' gap={5}>
              <h2>Actualizar datos personales</h2>
              <UpdateUserForm
                state={state}
                handleFieldClick={handleFieldClick}
                handleUpdate={handleUpdate}
                fieldToEdit={fieldToEdit}
                isOpen={isOpen}
                onClose={onClose}
              />
              {user?.role === 'admin' ? null : (
                <Button colorScheme='red' onClick={onDeleteOpen}>
                  Eliminar cuenta
                </Button>
              )}
              <DeleteAccountModal
                isDeleteOpen={isDeleteOpen}
                onDeleteClose={onDeleteClose}
                isDeleting={isDeleting}
                handleDeleteAccount={handleDeleteAccount}
              />
            </Flex>
          )}
          {activeTab === 'historial' && (
            <Flex direction='column' align='center' gap={5}>
              <h2>Pedidos Realizados</h2>
              <UserOrderHistory
                orders={orders}
                selectedOrder={selectedOrder}
                setSelectedOrder={setSelectedOrder}
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}
              />
            </Flex>
          )}
        </Box>
      </Flex>
    </main>
  );
};

export default Profile;
