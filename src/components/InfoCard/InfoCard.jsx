import { Flex, Icon, Text } from '@chakra-ui/react';

const InfoCard = ({ icon, count, label, w = '100%' }) => {
  return (
    <Flex w={w} h='10svh' bg='white' borderRadius='10px' p={5} align='center'>
      <Icon as={icon} boxSize={12}></Icon>
      <Flex direction='column' ml={5}>
        <Text fontSize='2rem' color='isc.darkAccent'>
          {count}
        </Text>
        <Text>{label}</Text>
      </Flex>
    </Flex>
  );
};

export default InfoCard;
