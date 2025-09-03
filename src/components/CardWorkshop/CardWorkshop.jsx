import { Flex, Heading, Image, Text } from '@chakra-ui/react';

const CardWorkshop = ({ workshop, setSelectedWorkshop, onOpen, day, time }) => {
  return (
    <Flex
      direction='column'
      p={4}
      ml={{ base: '0', md: '5' }}
      mt={5}
      width={{ base: '320px', md: '400px' }}
      border='1px solid'
      borderRadius='10px'
      borderColor='gray.400'
      bg='rgba(255, 255, 255, 0.1)'
      backdropFilter='blur(10px)'
      boxShadow='0 4px 30px rgba(0, 0, 0, 0.1)'
      transition='all 0.3s ease-in-out'
      _hover={{
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        transform: 'scale(1.02)',
        boxShadow: '0 6px 40px rgba(0, 0, 0, 0.15)'
      }}
      cursor='pointer'
      onClick={() => {
        setSelectedWorkshop(workshop), onOpen();
      }}
    >
      <Heading size='md' textAlign='center' mb={4}>
        {workshop.title}
      </Heading>
      <Text textAlign='center' fontSize='clamp(0.8rem, 5vw, 1rem)' mb={5}>
        {workshop.description}
      </Text>
      <Flex w='100%' h='auto' align='center' borderRadius='10px'>
        <Image src={workshop.image} w='100%' objectFit='contain' />
      </Flex>
      <Flex direction='column'>
        <Flex align='flex-start' width='100%'>
          <Text>
            Fecha: {day} a las {time}
          </Text>
        </Flex>
        <Flex width='100%' justify='flex-end'>
          <Text>Plazas: {workshop.capacity}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CardWorkshop;
