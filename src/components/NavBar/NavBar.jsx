import { Flex, Tooltip } from '@chakra-ui/react';
import CustomLink from '../CustomLink/CustomLink';
import { Link } from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <Flex as='nav' w='80%' p={{ base: 2, md: 4 }} justifyContent='center'>
      <Flex
        as='ul'
        className='ul_navbar'
        gap={{ base: 2, md: 8 }}
        justify={{ base: 'center', md: 'space-evenly' }}
        maxW='1200px'
      >
        <CustomLink link='/' nameLink='Inicio' />
        <CustomLink link='/products' nameLink='Productos' />
        <CustomLink link='/workshops' nameLink='Talleres' />
        <CustomLink link='/blog' nameLink='Blog' />

        {user && <CustomLink link='/profile' nameLink='Mi cuenta' />}
        {user?.role === 'admin' && (
          <Link to='/dashboard'>
            <Tooltip label='Dashboard' placement='right' hasArrow>
              <Flex
                boxSize={50}
                border='5px solid  #fff'
                borderRadius='50%'
                bg='gray.500'
                justify='center'
                align='center'
                position='fixed'
                bottom={4}
                left={4}
                cursor='pointer'
                zIndex='2'
              >
                ☢️
              </Flex>
            </Tooltip>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
