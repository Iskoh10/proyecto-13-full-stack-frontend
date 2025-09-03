import { Button, Flex, Text } from '@chakra-ui/react';

const ProductsPagination = ({ pagination, refreshProducts }) => {
  return (
    <Flex
      className='products-pagination'
      justify='center'
      align='center'
      gap={4}
      mt={6}
    >
      <Button
        onClick={() => refreshProducts(pagination.page - 1)}
        isDisabled={pagination.page === 1}
        fontSize={{ base: '0.8rem', md: '1rem' }}
      >
        Anterior
      </Button>
      <Text fontSize='clamp(0.8rem, 5vw, 1rem)' textAlign='center'>
        Página {pagination.page} de {pagination.lastPage}
      </Text>

      <Button
        onClick={() => refreshProducts(pagination.page + 1)}
        isDisabled={pagination.page === pagination.lastPage}
        fontSize={{ base: '0.8rem', md: '1rem' }}
      >
        Siguiente
      </Button>
    </Flex>
  );
};

export default ProductsPagination;
