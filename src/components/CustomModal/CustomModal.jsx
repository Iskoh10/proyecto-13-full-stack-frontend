import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay
} from '@chakra-ui/react';

const CustomModal = ({ isOpen, onClose, children, size = 'lg' }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <ModalCloseButton />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
