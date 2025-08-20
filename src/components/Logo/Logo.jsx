import { Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Flex align='center' direction='column' gap='2' w='20%'>
      <Link to='/'>
        <Image
          src='favicon.png'
          alt='Logo'
          boxSize={{ base: '50px', md: '70px' }}
        />
      </Link>
      <Text
        fontSize={{ base: 'sm', md: 'md', lg: 'xl' }}
        fontWeight='bold'
        color='isc.secondary'
      >
        La Panadería
      </Text>
    </Flex>
  );
};

export default Logo;
