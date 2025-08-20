import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack
} from '@chakra-ui/react';
import { useEffect } from 'react';

const EditFieldModal = ({
  field,
  fieldValue,
  isOpen,
  onClose,
  onSubmitField
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: { value: '' }
  });

  useEffect(() => {
    reset({ value: fieldValue || '' });
  }, [fieldValue, reset]);

  const onSubmit = (data) => {
    onSubmitField(data.value);
    onClose();
  };

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} size='lg'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modificar {field}</ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <VStack spacing='4' align='stretch'>
              <FormControl isInvalid={errors.value}>
                <FormLabel>{field}</FormLabel>
                <Input
                  {...register('value', {
                    required: `${field} es obligatorio`
                  })}
                />
                <FormErrorMessage>{errors.value?.message}</FormErrorMessage>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr='3' onClick={onClose}>
              Cancelar
            </Button>
            <Button type='submit' colorScheme='teal'>
              Guardar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </ChakraModal>
  );
};

export default EditFieldModal;
