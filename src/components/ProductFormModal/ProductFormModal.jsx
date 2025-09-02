import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  ModalFooter
} from '@chakra-ui/react';
import CustomModal from '../CustomModal/CustomModal';

const ProductFormModal = ({
  isOpenNewProduct,
  onCloseNewProduct,
  selectedProduct,
  onSubmit,
  handleSubmit,
  errors,
  register,
  imageFiles,
  typeProduct,
  handleSelect,
  loading,
  onImageAction
}) => {
  return (
    <CustomModal
      isOpen={isOpenNewProduct}
      onClose={onCloseNewProduct}
      size='xl'
    >
      <Flex direction='column' align='center' mt={5}>
        <Heading textAlign='center' mb={3}>
          {selectedProduct ? 'Modificar producto' : 'Crear nuevo producto'}
        </Heading>
        <form
          id='new-product-form'
          onSubmit={handleSubmit((data) =>
            onSubmit(data, imageFiles, selectedProduct, typeProduct)
          )}
        >
          <FormControl mb={4} isInvalid={errors.title}>
            <FormLabel>Nombre del producto</FormLabel>
            <Input
              placeholder='Nombre del producto...'
              {...register('nameProduct', {
                required: 'El nombre es obligatorio'
              })}
            />
          </FormControl>

          <FormControl mb={4} isInvalid={errors.slug}>
            <FormLabel>Descripción</FormLabel>
            <Input
              placeholder='Descripcion...'
              {...register('description', {
                required: 'La descripción es obligatorio'
              })}
            />
          </FormControl>

          <FormControl mb={4} isInvalid={errors.summary}>
            <FormLabel>Precio</FormLabel>
            <Input
              type='number'
              step='0.01'
              placeholder='Precio...'
              {...register('price', {
                required: 'El precio es obligatorio'
              })}
            />
          </FormControl>

          <FormControl mb={4} isInvalid={errors.body}>
            <FormLabel>Stock</FormLabel>
            <Input
              type='number'
              placeholder='Stock del producto...'
              {...register('stock', {
                required: 'El stock es obligatorio'
              })}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Imagen</FormLabel>
            <Input type='file' accept='image/*' onChange={onImageAction} />
            {imageFiles.length > 0 && (
              <Image
                src={URL.createObjectURL(imageFiles[0])}
                alt='preview'
                borderRadius='md'
                boxSize='200px'
                objectFit='cover'
              />
            )}
          </FormControl>

          <FormControl mb={4}>
            <Checkbox {...register('available')}>Disponible</Checkbox>
          </FormControl>

          <FormControl mb={4}>
            <Menu>
              <MenuButton
                as={Box}
                m={2}
                p={2}
                bg='white'
                w='250px'
                border='1px solid'
                borderColor='gray.400'
                _hover={{ bg: 'gray.200' }}
                borderRadius='md'
                cursor='pointer'
              >
                {typeProduct ? typeProduct : 'Tipo de producto'}
              </MenuButton>
              <MenuList placement='bottom-start'>
                <MenuItem onClick={() => handleSelect('panaderia')}>
                  Panadería
                </MenuItem>
                <MenuItem onClick={() => handleSelect('bolleria')}>
                  Bollería
                </MenuItem>
                <MenuItem onClick={() => handleSelect('pasteleria')}>
                  Pastelería
                </MenuItem>
              </MenuList>
            </Menu>
          </FormControl>

          <ModalFooter>
            <Button
              colorScheme={selectedProduct ? 'red' : 'blue'}
              type='submit'
              form='new-product-form'
              isLoading={loading.products}
              loadingText={selectedProduct ? 'Modificando...' : 'Creando...'}
              isDisabled={loading.products}
            >
              {selectedProduct ? 'Modificar' : 'Crear'}
            </Button>
            <Button ml={3} onClick={onCloseNewProduct}>
              Cancelar
            </Button>
          </ModalFooter>
        </form>
      </Flex>
    </CustomModal>
  );
};

export default ProductFormModal;
