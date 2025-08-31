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
import { useEffect, useState } from 'react';

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
    formState: { errors },
    watch
  } = useForm({
    defaultValues: { value: '' }
  });

  const [showPassword, setShowPassword] = useState(false);
  const password = watch('password');

  useEffect(() => {
    if (field.toLowerCase() === 'contraseña') {
      reset({ password: '', confirm: '' });
    } else {
      reset({ value: fieldValue || '' });
    }
  }, [fieldValue, field, reset]);

  const onSubmit = (data) => {
    if (field.toLowerCase() === 'contraseña') {
      if (data.password !== data.confirm) return;
      onSubmitField(data.password);
    } else {
      onSubmitField(data.value);
    }
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
              {field.toLowerCase() === 'contraseña' ? (
                <>
                  <FormControl isInvalid={errors.password}>
                    <FormLabel>Nueva contraseñá</FormLabel>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', {
                        required: 'Campo obligatorio',
                        minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                      })}
                    />
                    <FormErrorMessage>
                      {errors.password?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.confirm}>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...register('confirm', {
                        required: 'Campo obligatorio',
                        validate: (value) => value === password || 'No coincide'
                      })}
                    />
                    <FormErrorMessage>
                      {errors.confirm?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <label>
                    <input
                      type='checkbox'
                      onChange={() => setShowPassword((prev) => !prev)}
                    />
                    Mostrar contraseña
                  </label>
                </>
              ) : (
                <FormControl isInvalid={errors.value}>
                  <FormLabel>{field}</FormLabel>
                  <Input
                    type='text'
                    {...register('value', {
                      required: `${field} es obligatorio`
                    })}
                  />
                  <FormErrorMessage>{errors.value?.message}</FormErrorMessage>
                </FormControl>
              )}
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
