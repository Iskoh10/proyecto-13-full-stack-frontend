import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import './NotFound.css';
import { Link } from 'react-router-dom';
import Bg404 from '../../components/Bg404/Bg404';

const NotFound = () => {
  return (
    <main className='not_found'>
      <Bg404 />
      <Flex direction='column' align='center' minH='100vh' justify='center'>
        <Heading
          display='inline-block'
          as='h1'
          fontSize='10em'
          sx={{
            backgroundImage: 'url("./bg.svg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
          fontWeight='bold'
        >
          404
        </Heading>
        <Text color='isc.secondary' mb='10px'>
          Vuelve a donde huele a pan!
        </Text>

        <Button as={Link} to='/'>
          Volver
        </Button>
      </Flex>
    </main>
  );
};

export default NotFound;
