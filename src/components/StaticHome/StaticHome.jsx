import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

const StaticHome = () => {
  return (
    <Box as='section' px={{ base: 4, md: 12 }} py={12}>
      <Box textAlign='center' mb={12}>
        <Heading fontSize={{ base: '3xl', md: '5xl' }} color='isc.darkAccent'>
          Breve historia del Pan
        </Heading>
      </Box>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align='center'
        justify='space-between'
        gap={8}
        mb={16}
      >
        <Text fontSize={{ base: 'md', md: 'xl' }} textAlign='center'>
          En 2019 se produjo un hallazgo que transformó nuestra visión sobre el
          origen del pan. Hasta entonces, la idea más aceptada era que este
          alimento había surgido tras el desarrollo de la agricultura, hace unos
          8.000-10.000 años.
        </Text>
        <Image
          src='./assets/parallax/bread1.jpg'
          alt='bread1'
          maxW={{ base: '90%', md: '40%' }}
          borderRadius='lg'
          objectFit='cover'
        />
      </Flex>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align='center'
        gap={4}
        mb={5}
      >
        <Flex direction='column' align='center' gap={6}>
          <Image
            src='./assets/parallax/bread2.jpg'
            alt='bread2'
            borderRadius='full'
            maxW='200px'
            objectFit='cover'
          />
          <Text
            fontSize={{ base: 'md', md: 'xl' }}
            textAlign={{ base: 'center', md: 'right' }}
          >
            En este descubrimiento, en zonas de Jordanía, se hallaron restos
            carbonizados de migas de pan de hace 14.400 años, en asentamientos
            de cazadores-recolectores de la época natufiense, es decir, entre
            4.000 y 6.000 años antes del inicio de la agricultura.
          </Text>
        </Flex>

        <Image
          src='./assets/parallax/bread3.png'
          alt='bread3'
          maxW='250px'
          objectFit='contain'
        />
      </Flex>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align='center'
        justify='space-between'
        gap={10}
      >
        <Text fontSize={{ base: 'md', md: 'xl' }} textAlign='center'>
          En nuestra panadería utilizamos masa madre para elaborar el pan, lo
          que implica un amasado cuidadoso y una selección rigurosa de las
          materias primas. Su fermentación requiere más tiempo, pero este
          proceso lento nos permite obtener un pan con un sabor más intenso y
          una conservación superior.
          <br />
          <Text
            as='span'
            fontSize={{ base: 'lg', md: '2xl' }}
            color='isc.darkAccent'
          >
            A tope con la Masa Madre!!! ♥️
          </Text>
        </Text>
        <Image
          src='./assets/parallax/bread4.png'
          alt='bread4'
          flex='1'
          maxW={{ base: '90%', md: '40%' }}
          borderRadius='lg'
          objectFit='contain'
        />
      </Flex>
    </Box>
  );
};

export default StaticHome;
