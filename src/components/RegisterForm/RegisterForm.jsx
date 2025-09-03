import { useForm } from 'react-hook-form';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import { useUser } from '../../Providers/UserContext';
import { useNavigate } from 'react-router-dom';
import useCustomToast from '../../hooks/useCustomToast';

const RegisterForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loginUser } = useUser();
  const navigate = useNavigate();
  const { showToast } = useCustomToast();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:3000/api/v1/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Error al registrarse');

      const authMeRes = await fetch('http://localhost:3000/api/v1/auth/me', {
        credentials: 'include'
      });

      if (!authMeRes.ok)
        throw new Error('Error obteniendo usuario tras registro');

      const authMeData = await authMeRes.json();

      loginUser(authMeData.user);
      navigate('/products');
      onClose();
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'No se pudo completar la acción',
        status: 'error'
      });
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme='teal'
        position='absolute'
        top={{ base: '52%', md: '20%' }}
        left={{ base: '50%', md: '5%' }}
        transform={{ base: 'translateX(-50%)', md: 'none' }}
      >
        Registrarse ➡️
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size='lg'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registro</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <VStack spacing='4' align='stretch'>
                <FormControl isInvalid={errors.name}>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    {...register('name', {
                      required: 'El nombre es obligatorio'
                    })}
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.lastName}>
                  <FormLabel>Apellidos</FormLabel>
                  <Input
                    {...register('lastName', {
                      required: 'Los apellidos son obligatorios'
                    })}
                  />
                  <FormErrorMessage>
                    {errors.lastName?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type='email'
                    {...register('email', {
                      required: 'El email es obligatorio'
                    })}
                  />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password}>
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    type='password'
                    {...register('password', {
                      required: 'La contraseña es obligatoria',
                      minLength: {
                        value: 6,
                        message: 'Mínimo 6 caracteres'
                      }
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.address}>
                  <FormLabel>Dirección</FormLabel>
                  <Input
                    {...register('address', {
                      required: 'La dirección es obligatoria'
                    })}
                  />
                  <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.phone}>
                  <FormLabel>Teléfono</FormLabel>
                  <Input
                    type='tel'
                    {...register('phone', {
                      required: 'El teléfono es obligatorio',
                      pattern: {
                        value: /^[0-9]{7,14}$/,
                        message: 'Teléfono no válido'
                      }
                    })}
                  />
                  <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant='ghost' mr='3' onClick={onClose}>
                Cancelar
              </Button>
              <Button type='submit' colorScheme='teal'>
                Registrarse
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RegisterForm;
