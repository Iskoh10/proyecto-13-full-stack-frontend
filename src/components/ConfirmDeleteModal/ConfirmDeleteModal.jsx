import { Button, Flex, Text } from '@chakra-ui/react';
import CustomModal from '../CustomModal/CustomModal';

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  textQuestion,
  loading = '',
  onAction
}) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <Flex direction='column' textAlign='center' mt={5}>
        <Text>{textQuestion}</Text>
        <Flex justify='center' mt={10}>
          <Button variant='ghost' mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme='red' isLoading={loading} onClick={onAction}>
            Eliminar
          </Button>
        </Flex>
      </Flex>
    </CustomModal>
  );
};

export default ConfirmDeleteModal;
