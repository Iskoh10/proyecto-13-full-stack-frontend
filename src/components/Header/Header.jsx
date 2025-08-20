import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import Logo from '../Logo/Logo';
import NavBar from '../NavBar/NavBar';
import { useUser } from '../../Providers/UserContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Header = () => {
  const { user, loading, logoutUser } = useUser();
  const navigate = useNavigate();

  if (loading) return null;

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  return (
    <Box as='header' p='6' boxShadow='sm' bg='isc.primary'>
      <Flex align='center'>
        <Logo />
        <NavBar user={user} />
        <Spacer />
        {user ? (
          <Button colorScheme='red' onClick={handleLogout} px={3}>
            Cerrar sesión
          </Button>
        ) : (
          <Button colorScheme='green' as={RouterLink} to='/login' px={3}>
            Iniciar sesión
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
