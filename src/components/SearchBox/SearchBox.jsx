import { Button, Flex, Input, InputGroup } from '@chakra-ui/react';

const SearchBox = ({ inputRef, handleSearch, placeholder, allButton = '' }) => {
  return (
    <Flex
      bg='white'
      w='600px'
      p={2}
      justify='space-between'
      borderRadius='10px'
    >
      <InputGroup w='100%' gap={5}>
        <Input type='search' placeholder={placeholder} ref={inputRef} />
        <Button ml={2} colorScheme='blue' onClick={handleSearch}>
          Buscar
        </Button>
        {allButton && allButton}
      </InputGroup>
    </Flex>
  );
};

export default SearchBox;
