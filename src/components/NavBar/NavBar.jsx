import { Flex, Tooltip } from '@chakra-ui/react';
import CustomLink from '../CustomLink/CustomLink';
import { Link } from 'react-router-dom';

const NavBar = ({
  user,
  onClose,
  flexDirection = 'row',
  display = 'flex',
  w = '80%'
}) => {
  return (
    <Flex
      as='nav'
      w={w}
      p={{ base: 2, md: 4 }}
      justifyContent='center'
      display={display}
    >
      <Flex
        as='ul'
        className='ul_navbar'
        gap={{ base: 2, md: 6 }}
        justify={{ base: 'center', md: 'space-evenly' }}
        flexDirection={flexDirection}
        maxW='1200px'
      >
        <CustomLink link='/' nameLink='Inicio' onClick={onClose} />
        <CustomLink link='/products' nameLink='Productos' onClick={onClose} />
        <CustomLink link='/workshops' nameLink='Talleres' onClick={onClose} />
        <CustomLink link='/blog' nameLink='Blog' onClick={onClose} />

        {user && (
          <CustomLink link='/profile' nameLink='Mi cuenta' onClick={onClose} />
        )}
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
