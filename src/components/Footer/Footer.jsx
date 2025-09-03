import { Box, Stack, Text, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as='footer' bg='isc.primary' py='6' color='isc.secondary'>
      <Stack direction='column' align='center' spacing='2'>
        <Text fontSize='sm' textAlign='center'>
          © {new Date().getFullYear()} La Panadería. Todos los derechos
          reservados.
        </Text>
        <Stack
          direction='row'
          spacing='4'
          fontSize={'clamp(0.9rem, 2vw, 1.3rem)'}
        >
          <Link as='span' _hover={{ color: 'isc.accent' }}>
            Privacidad
          </Link>
          <Link as='span' _hover={{ color: 'isc.accent' }}>
            Términos
          </Link>
          <Link as='span' _hover={{ color: 'isc.accent' }}>
            Contacto
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
