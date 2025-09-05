import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Spacer,
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react';
import Logo from '../Logo/Logo';
import NavBar from '../NavBar/NavBar';
import { useUser } from '../../Providers/UserContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Header = () => {
  const { user, loading, logoutUser } = useUser();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isWideScreen] = useMediaQuery('(min-width: 1360px)');

  if (loading) return null;

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  return (
    <Box as='header' p='6' boxShadow='sm' bg='isc.primary'>
      <Flex align='center'>
        <Logo />
        {isWideScreen ? (
          <NavBar user={user} />
        ) : (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          >
            ☰
          </Button>
        )}
        <Spacer />
        {user ? (
          <Button
            colorScheme='red'
            fontSize={{ base: 'sm', md: 'xs', lg: 'lg' }}
            onClick={handleLogout}
            px={3}
          >
            Cerrar sesión
          </Button>
        ) : (
          <Button colorScheme='green' as={RouterLink} to='/login' px={3}>
            Iniciar sesión
          </Button>
        )}
      </Flex>

      <Drawer isOpen={isOpen} placement='left' size='sm' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Flex>
              <Logo direction='row' color='black' w='100%' />
            </Flex>
            <Divider />
            <NavBar
              user={user}
              flexDirection='column'
              gap={4}
              onClose={onClose}
              isDrawer
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
