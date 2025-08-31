import { Button, Flex, Text } from '@chakra-ui/react';
import CustomModal from '../CustomModal/CustomModal';

const DeleteAccountModal = ({
  isDeleteOpen,
  onDeleteClose,
  isDeleting,
  handleDeleteAccount
}) => {
  return (
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
  );
};

export default DeleteAccountModal;
