import { Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Logo = ({ direction = 'column', color = 'isc.secondary', w = '20%' }) => {
  return (
    <Flex
      align='center'
      direction={direction}
      gap='2'
      w={w}
      display={{ base: 'none', md: 'block' }}
    >
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
        color={color}
      >
        La Panadería
      </Text>
    </Flex>
  );
};

export default Logo;
