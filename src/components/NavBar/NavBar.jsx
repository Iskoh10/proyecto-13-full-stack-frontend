import { Flex } from '@chakra-ui/react';
import CustomLink from '../CustomLink/CustomLink';

const NavBar = ({ user }) => {
  return (
    <Flex as='nav' w='80%' p={{ base: 2, md: 4 }} justifyContent='center'>
      <Flex
        as='ul'
        className='ul_navbar'
        gap={{ base: 4, md: 8 }}
        justify={{ base: 'center', md: 'space-evenly' }}
        maxW='1200px'
      >
        <CustomLink link='/' nameLink='Inicio' />
        <CustomLink link='/products' nameLink='Productos' />
        <CustomLink link='/workshops' nameLink='Talleres' />
        <CustomLink link='/blog' nameLink='Blog' />

        {user && <CustomLink link='/profile' nameLink='Mi cuenta' />}
      </Flex>
    </Flex>
  );
};

export default NavBar;
