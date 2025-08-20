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
import useCustomToast from '../../hooks/useCustomToast';
import { useUser } from '../../Providers/UserContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const { showToast } = useCustomToast();
  const { loginUser } = useUser();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email: data.email, password: data.password })
      });

      const dataRes = await response.json();

      if (response.ok) {
        loginUser(dataRes.user);

        showToast({ title: 'Login exitoso', status: 'success' });
        reset();
        onClose();
        navigate('/products');
      } else {
        showToast({
          title: 'Error',
          description: 'Credenciales Incorrectas',
          status: 'error'
        });
      }
    } catch (error) {
      showToast({
        title: 'Error en la red',
        description: 'No se pudo conectar con el servidor',
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
        right='5%'
        top='20%'
      >
        ⬅️ Loguearse
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size='lg'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log In</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <VStack spacing='4' align='stretch'>
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
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant='ghost' mr='3' onClick={onClose}>
                Cancelar
              </Button>
              <Button type='submit' colorScheme='teal'>
                Loguearse
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginForm;
