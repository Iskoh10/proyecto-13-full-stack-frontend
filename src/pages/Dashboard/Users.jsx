import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import HeadingDash from '../../components/HeadingDash/HeadingDash';
import { useDashboard } from '../../Providers/DashboardContext';
import { useRef, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import InfoCard from '../../components/InfoCard/InfoCard';
import SearchBox from '../../components/SearchBox/SearchBox';
import DeleteButton from '../../components/DeleteButton/DeleteButton';
import DashboardButton from '../../components/DashboardButton/DashboardButton';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal/ConfirmDeleteModal';
import useSearchResource from '../../hooks/useSearchResource';

const Users = () => {
  const {
    users,
    setUsers,
    setLoading,
    fetchResources,
    deleteResources,
    showToast
  } = useDashboard();
  const inputRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);

  const { handleSearch } = useSearchResource({
    inputRef,
    setLoading,
    resource: 'users',
    setItems: setUsers,
    showToast
  });

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

      <Flex gap={10} align='center' mb={10}>
        <InfoCard
          w='25%'
          icon={FaUsers}
          count={users?.users?.filter((user) => !user.isDeleted).length}
          label='Usuarios totales'
        />
        <SearchBox
          inputRef={inputRef}
          handleSearch={handleSearch}
          placeholder='Buscar usuario...'
        />
      </Flex>

      <Flex direction='column'>
        <Flex
          className='users-result'
          w='100%'
          bg='white'
          direction='column'
          borderRadius='10px'
          p={4}
        >
          <Flex p={2} align='center' gap={2}>
            <DashboardButton
              onAction={handleReloadUsers}
              value='pending'
              bg='green.300'
            >
              Todos
            </DashboardButton>
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

          {users.users.length > 0 ? (
            users?.users
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
                    <DeleteButton
                      item={user}
                      setSelectedItem={setSelectedUser}
                      disabledCondition={user.role === 'admin'}
                      onOpen={onOpen}
                    />
                  </Flex>
                );
              })
          ) : (
            <Text textAlign='center'>Ningún usuario encontrado</Text>
          )}
          <ConfirmDeleteModal
            isOpen={isOpen}
            onClose={() => {
              setSelectedUser(null);
              onClose();
            }}
            textQuestion={`¿Estás seguro de que quieres eliminar a ${selectedUser?.name}?`}
            onAction={confirmDelete}
          />
        </Flex>
      </Flex>
    </section>
  );
};

export default Users;
