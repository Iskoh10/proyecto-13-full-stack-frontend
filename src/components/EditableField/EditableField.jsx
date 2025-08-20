import { Box, Flex, Text } from '@chakra-ui/react';

const EditableField = ({ label, value, onClick }) => (
  <Flex align='flex-start' w='100%' direction='column'>
    <Text as='label'>{label}:</Text>
    <Box
      as='p'
      w='100%'
      border='1px solid'
      borderColor='gray.300'
      borderRadius='10px'
      bg='gray.100'
      p={2}
      cursor='pointer'
      onClick={onClick}
    >
      {value}
    </Box>
  </Flex>
);

export default EditableField;
