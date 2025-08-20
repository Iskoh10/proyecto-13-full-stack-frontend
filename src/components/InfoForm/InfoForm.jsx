import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

const InfoForm = () => {
  return (
    <Flex direction='column' align='center' width='50%' pt='15%' margin='auto'>
      <Heading>Bienvenido</Heading>
      <Text textAlign='center'>
        Si lo que buscas es una experiencia única a la vez de comer un buen pan,
        registrate para poder hacer pedidos o asistir a talleres. Si ya estás
        registrado, logueate! para conseguir los superpoderes.
      </Text>
      <Box>
        <Image
          src='./assets/baker.png'
          alt='panadero'
          boxSize={{ base: '100px', md: '200px' }}
          position='absolute'
          opacity='0.2'
          left='25%'
          top='40%'
          zIndex='-1'
        />
      </Box>
    </Flex>
  );
};

export default InfoForm;
