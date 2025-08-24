import { Button, Flex, Input, InputGroup } from '@chakra-ui/react';
import HeadingDash from '../../components/HeadingDash/HeadingDash';

const Users = () => {
  return (
    <section className='main-dashboard'>
      <HeadingDash>Usuarios</HeadingDash>

      <Flex direction='column'>
        <InputGroup w='50%' alignSelf='center' mb={10}>
          <Input type='search' placeholder='Buscar usuario...' />
          <Button ml={2} colorScheme='blue'>
            Buscar
          </Button>
        </InputGroup>

        <Flex className='users-result' w='100%' bg='white' direction='column'>
          <Flex p={2}>Todos usuarios por defecto</Flex>
          <Flex p={2}>Juan</Flex>
        </Flex>
      </Flex>
    </section>
  );
};

export default Users;
