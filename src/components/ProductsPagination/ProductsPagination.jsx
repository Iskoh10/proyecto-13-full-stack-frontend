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
      >
        Anterior
      </Button>
      <Text>
        Página {pagination.page} de {pagination.lastPage}
      </Text>

      <Button
        onClick={() => refreshProducts(pagination.page + 1)}
        isDisabled={pagination.page === pagination.lastPage}
      >
        Siguiente
      </Button>
    </Flex>
  );
};

export default ProductsPagination;
