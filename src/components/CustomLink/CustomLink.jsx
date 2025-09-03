import { NavLink } from 'react-router-dom';
import { Box, Flex, Icon, useColorModeValue } from '@chakra-ui/react';

const CustomLink = ({ link, nameLink, onClick, icon = null }) => {
  const activeColor = useColorModeValue('isc.secondary', 'isc.secondary');
  const inactiveColor = useColorModeValue('isc.accent', 'isc.accent');

  return (
    <Box as='li' listStyleType='none'>
      <NavLink to={link} onClick={onClick}>
        <Flex
          align='center'
          gap={5}
          fontSize={{ base: '1.5rem', sm: '1rem', md: '2rem' }}
          p={{ base: '0.2em', md: '0.4em' }}
          bg='transparent'
          position='relative'
          color={inactiveColor}
          _hover={{
            color: activeColor,
            _after: {
              width: '100%',
              transition: 'all 0.5s ease-in-out'
            }
          }}
          _after={{
            content: `''`,
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: 0,
            height: '3px',
            backgroundColor: 'hsl(var(--isc-active-link-navbar))',
            transition: 'all 0.5s ease-in-out'
          }}
          _before={{
            content: `''`,
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(0deg, hsla(var(--isc-active-link-navbar), 0.5) 0%, hsla(var(--isc-active-link-navbar), 0) 100%)',
            opacity: 0,
            transition: 'opacity 0.8s ease'
          }}
        >
          {icon && <Icon as={icon} boxSize={10} />}
          {nameLink}
        </Flex>
      </NavLink>
    </Box>
  );
};

export default CustomLink;
