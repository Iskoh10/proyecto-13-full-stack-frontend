import { Button, Flex, Input, InputGroup } from '@chakra-ui/react';

const SearchBox = ({ inputRef, handleSearch, placeholder }) => {
  return (
    <Flex
      bg='white'
      w='600px'
      p={2}
      justify='space-between'
      borderRadius='10px'
    >
      <InputGroup w='100%'>
        <Input type='search' placeholder={placeholder} ref={inputRef} />
        <Button ml={2} colorScheme='blue' onClick={handleSearch}>
          Buscar
        </Button>
      </InputGroup>
    </Flex>
  );
};

export default SearchBox;
