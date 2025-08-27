import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import HeadingDash from '../../components/HeadingDash/HeadingDash';
import { useDashboard } from '../../Providers/DashboardContext';
import { useRef, useState } from 'react';
import useCustomToast from '../../hooks/useCustomToast';
import { FaTrash } from 'react-icons/fa';
import CustomModal from '../../components/CustomModal/CustomModal';

const Users = () => {
  const { users, setUsers, fetchResources, deleteResources } = useDashboard();
  const inputRef = useRef();
  const { showToast } = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearch = async () => {
    const search = inputRef.current.value;
    if (!search.trim()) return;

    fetchResources(
      `http://localhost:3000/api/v1/users/by-name/${search}`,
      setUsers,
      'users'
    );
    inputRef.current.value = '';
  };

  const handleReloadUsers = () => {
    fetchResources('http://localhost:3000/api/v1/users', setUsers, 'users');
  };

  const confirmDelete = () => {
    deleteResources('users', selectedUser._id, setUsers);
    setSelectedUser(null);
    onClose();
  };

  return (
    <section className='main-dashboard'>
      <HeadingDash>Usuarios</HeadingDash>

      <Flex direction='column'>
        <InputGroup w='50%' alignSelf='center' mb={10}>
          <Input type='search' placeholder='Buscar usuario...' ref={inputRef} />
          <Button ml={2} colorScheme='blue' onClick={handleSearch}>
            Buscar
          </Button>
        </InputGroup>

        <Flex
          className='users-result'
          w='100%'
          bg='white'
          direction='column'
          borderRadius='10px'
          p={4}
        >
          <Flex p={2} align='center' gap={2}>
            Usuarios («{users?.users?.filter((user) => !user.isDeleted).length}
            »)
            <Button onClick={handleReloadUsers} variant='solid' bg='green.300'>
              Todos
            </Button>
          </Flex>
          <Flex w='100%' justify='flex-start' mb={4} bg='gray.200' p={1}>
            <Text flex={1} textAlign='left'>
              Nombre completo
            </Text>
            <Text flex={1} textAlign='left'>
              Número teléfono
            </Text>
            <Text flex={2} align='left'>
              Email
            </Text>
          </Flex>

          {users?.users
            ?.filter((user) => !user.isDeleted)
            .map((user, index) => {
              const bgColor =
                user.role === 'admin'
                  ? 'green.200'
                  : index % 2 === 0
                  ? 'white'
                  : 'gray.100';

              return (
                <Flex
                  key={user._id}
                  w='100%'
                  p={1}
                  align='center'
                  justify='flex-start'
                  bg={bgColor}
                  _hover={{ bg: 'gray.300' }}
                >
                  <Text flex={1} textAlign='left' cursor='default'>
                    {user.name} {user.lastName}
                  </Text>
                  <Text flex={1} textAlign='left' cursor='default'>
                    {user.phone}
                  </Text>
                  <Text flex={2} align='left' cursor='default'>
                    {user.email}
                  </Text>
                  <IconButton
                    aria-label='Eliminar usuario'
                    icon={<FaTrash />}
                    colorScheme='red'
                    size='xs'
                    isDisabled={user.role === 'admin'}
                    onClick={() => {
                      setSelectedUser(user);
                      onOpen();
                    }}
                  />
                </Flex>
              );
            })}
          <CustomModal
            isOpen={isOpen}
            onClose={() => {
              setSelectedUser(null);
              onClose();
            }}
          >
            <Flex direction='column' mt={8}>
              <Text m={5}>
                ¿Estás seguro de que quieres eliminar a {selectedUser?.name}?
              </Text>
              <Flex justify='flex-end'>
                <Button
                  onClick={() => {
                    setSelectedUser(null);
                    onClose();
                  }}
                  mr={3}
                >
                  Cancelar
                </Button>
                <Button colorScheme='red' onClick={confirmDelete}>
                  Elimminar
                </Button>
              </Flex>
            </Flex>
          </CustomModal>
        </Flex>
      </Flex>
    </section>
  );
};

export default Users;
