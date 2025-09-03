import { Box, Flex, Text } from '@chakra-ui/react';

const ProfileAside = ({ state, activeTab, setActiveTab }) => {
  return (
    <Box
      as='aside'
      w={{ base: '100%', md: '250px' }}
      h={{ base: '200px', md: '100svh' }}
      p={4}
      bg='gray.100'
      border='1px solid'
      borderColor='gray.300'
    >
      <Flex direction='column' border='1px solid' borderColor='gray.300' mb={5}>
        <Text as='p'>{state.name + ' ' + state.lastName}</Text>
        <Text as='p'>{state.email}</Text>
      </Flex>
      <Flex direction='column'>
        <Box
          as='button'
          w='100%'
          textAlign='left'
          mb={2}
          p={2}
          bg={activeTab === 'perfil' ? 'gray.400' : 'transparent'}
          _hover={{ bg: 'gray.500' }}
          onClick={() => setActiveTab('perfil')}
        >
          Perfil
        </Box>
        <Box
          as='button'
          w='100%'
          textAlign='left'
          mb={2}
          p={2}
          bg={activeTab === 'historial' ? 'gray.400' : 'transparent'}
          _hover={{ bg: 'gray.500' }}
          onClick={() => setActiveTab('historial')}
        >
          Historial Pedidos
        </Box>
      </Flex>
    </Box>
  );
};

export default ProfileAside;
