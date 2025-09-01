import { Button, Flex, Text } from '@chakra-ui/react';
import CustomModal from '../CustomModal/CustomModal';

const AdminDeleteUserModal = ({
  isOpen,
  selectedUser,
  setSelectedUser,
  onClose,
  confirmDelete
}) => {
  return (
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
  );
};

export default AdminDeleteUserModal;
