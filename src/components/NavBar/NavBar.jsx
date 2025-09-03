import { Flex, Tooltip } from '@chakra-ui/react';
import CustomLink from '../CustomLink/CustomLink';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { GrBlog, GrWorkshop } from 'react-icons/gr';
import { RiAccountCircleFill } from 'react-icons/ri';

const NavBar = ({ user, onClose, flexDirection = 'row', isDrawer }) => {
  return (
    <Flex as='nav' p={{ base: 2, md: 4 }} justifyContent='flex-start'>
      <Flex
        as='ul'
        className='ul_navbar'
        gap={{ base: 2 }}
        justify={{ base: 'center' }}
        flexDirection={flexDirection}
        maxW='1200px'
      >
        <CustomLink
          link='/'
          nameLink='Inicio'
          onClick={onClose}
          icon={isDrawer ? FaHome : null}
        />
        <CustomLink
          link='/products'
          nameLink='Productos'
          onClick={onClose}
          icon={isDrawer ? FaCartShopping : null}
        />
        <CustomLink
          link='/workshops'
          nameLink='Talleres'
          onClick={onClose}
          icon={isDrawer ? GrWorkshop : null}
        />
        <CustomLink
          link='/blog'
          nameLink='Blog'
          onClick={onClose}
          icon={isDrawer ? GrBlog : null}
        />

        {user && (
          <CustomLink
            link='/profile'
            nameLink='Mi cuenta'
            onClick={onClose}
            icon={isDrawer ? RiAccountCircleFill : null}
          />
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
                display={{ base: 'none', xl: 'flex' }}
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
