import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  ModalFooter,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import HeadingDash from '../../components/HeadingDash/HeadingDash';
import { useDashboard } from '../../Providers/DashboardContext';
import { FaBox, FaBreadSlice, FaPlus } from 'react-icons/fa';
import { useRef, useState } from 'react';
import { GiCakeSlice, GiCroissant } from 'react-icons/gi';
import Switcher from '../../components/Switcher/Switcher';
import useCustomToast from '../../hooks/useCustomToast';
import CustomModal from '../../components/CustomModal/CustomModal';
import { useForm } from 'react-hook-form';
import { useUser } from '../../Providers/UserContext';
import DeleteButton from '../../components/DeleteButton/DeleteButton';
import InfoCard from '../../components/InfoCard/InfoCard';
import SearchBox from '../../components/SearchBox/SearchBox';

const ProductsDash = () => {
  const {
    products,
    setProducts,
    loading,
    setLoading,
    fetchResources,
    filterByCategory,
    deleteResources
  } = useDashboard();
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      nameProduct: '',
      description: '',
      price: '',
      stock: '',
      available: true
    }
  });
  const inputRef = useRef();
  const { showToast } = useCustomToast();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenNewProduct,
    onOpen: onOpenNewProduct,
    onClose: onCloseNewProduct
  } = useDisclosure();
  const [imageFiles, setImageFiles] = useState([]);
  const [typeProduct, setTypeProduct] = useState('');

  const handleSearch = async () => {
    const search = inputRef.current.value.trim();
    if (!search) return;

    const url = new URL('http://localhost:3000/api/v1/products/filter');

    if (!isNaN(search)) {
      url.searchParams.append('price', search);
    } else {
      url.searchParams.append('nameProduct', search);
    }

    try {
      setLoading((prev) => ({ ...prev, products: true }));

      const res = await fetch(url.toString(), { credentials: 'include' });
      const data = await res.json();

      if (!data.products.length) {
        showToast({
          description: 'No se encontró ningún producto',
          status: 'info'
        });
      }

      setProducts(data);
      inputRef.current.value = '';
    } catch (error) {
      inputRef.current.value = '';
      showToast({
        title: 'Error',
        description: 'Error en la búsqueda.',
        status: 'error'
      });
    } finally {
      setLoading((prev) => ({ ...prev, products: false }));
    }
  };

  const handleSelect = (value) => {
    setTypeProduct(value);
  };

  const onSubmit = async (data) => {
    if (!user) throw new Error('No estás logueado.');
    if (imageFiles.length === 0) {
      showToast({
        title: 'Error',
        description: 'Sube una imagen',
        status: 'error'
      });
      return;
    }

    const formData = new FormData();
    formData.append('nameProduct', data.nameProduct);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('stock', Number(data.stock));
    formData.append('productImage', imageFiles[0]);
    formData.append('available', data.available ? true : false);
    formData.append('typeProduct', typeProduct);
    formData.append('user', user._id);

    try {
      setLoading((prev) => ({ ...prev, products: true }));
      const url = selectedProduct
        ? `http://localhost:3000/api/v1/products/${selectedProduct._id}`
        : 'http://localhost:3000/api/v1/products';
      const method = selectedProduct ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        credentials: 'include',
        body: formData
      });

      if (!res.ok) throw new Error('Error creando/actualizando el producto.');

      reset();
      setImageFiles([]);
      setSelectedProduct(null);
      onCloseNewProduct();
      fetchResources(
        'http://localhost:3000/api/v1/products',
        setProducts,
        'products'
      );

      showToast({
        description: selectedProduct
          ? 'Producto actualizado correctamente.'
          : 'Producto creado correctamente.',
        status: 'success'
      });
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'No se pudo guardar el producto',
        status: 'error'
      });
    } finally {
      setLoading((prev) => ({ ...prev, products: false }));
    }
  };

  const handleSwitch = async (productId, currentValue) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/products/${productId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ available: !currentValue })
        }
      );

      if (!res.ok) {
        throw new Error('Error en la actualización.');
      }

      const data = await res.json();

      setProducts((prev) => ({
        ...prev,
        products: prev.products.map((p) =>
          p._id === productId ? { ...p, available: !p.available } : p
        )
      }));

      showToast({
        title: 'Éxito',
        description: 'Disponibilidad actualizada.',
        status: 'success'
      });
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'No se pudo completar la acción.',
        status: 'error'
      });
    }
  };

  const confirmDelete = () => {
    deleteResources('products', selectedProduct._id, setProducts);
    setSelectedProduct(null);
    onClose();
  };

  return (
    <section className='main-dashboard'>
      <HeadingDash>Productos</HeadingDash>
      <Flex gap={10} align='center' mb={10}>
        <InfoCard
          w='25%'
          icon={FaBox}
          count={products.products?.length}
          label='Productos totales'
        />
        <SearchBox
          inputRef={inputRef}
          handleSearch={handleSearch}
          placeholder='Buscar producto...'
        />
      </Flex>
      <Flex align='flex-start' gap={10} bg='white' borderRadius='10px' p={4}>
        <Flex
          direction='column'
          gap={2}
          w='30%'
          borderRightWidth='4px'
          borderRightStyle='solid'
          borderRightColor='blue.400'
        >
          <Flex
            align='center'
            justify='space-around'
            bg='blue.400'
            _hover={{ bg: 'blue.200' }}
            w='90%'
            p={2}
            borderRadius='10px'
            cursor='pointer'
            onClick={() =>
              filterByCategory({ filter: 'allProducts', key: 'products' })
            }
          >
            <Text>Todos los productos</Text>
          </Flex>

          <Flex
            align='center'
            justify='space-around'
            bg='isc.darkAccent'
            _hover={{ bg: 'isc.accent' }}
            w='70%'
            p={2}
            borderRadius='10px'
            cursor='pointer'
            onClick={(e) =>
              filterByCategory({ filter: 'panaderia', key: 'products' })
            }
          >
            <Icon
              as={FaBreadSlice}
              boxSize={6}
              color='white'
              title='Panadería'
            />
            <Text color='white'>Panadería</Text>
          </Flex>
          <Flex
            align='center'
            justify='space-around'
            bg='isc.secondary'
            _hover={{ bg: 'isc.accent' }}
            w='70%'
            p={2}
            borderRadius='10px'
            cursor='pointer'
            onClick={() =>
              filterByCategory({ filter: 'bolleria', key: 'products' })
            }
          >
            <Icon as={GiCroissant} boxSize={6} color='white' title='Bollería' />
            <Text color='white'>Bollería</Text>
          </Flex>
          <Flex
            align='center'
            justify='space-around'
            bg='red.500'
            _hover={{ bg: 'red.200' }}
            w='70%'
            p={2}
            borderRadius='10px'
            cursor='pointer'
            onClick={() =>
              filterByCategory({ filter: 'pasteleria', key: 'products' })
            }
          >
            <Icon
              as={GiCakeSlice}
              boxSize={6}
              color='white'
              title='Pastelería'
            />
            <Text color='white'>Pastelería</Text>
          </Flex>
        </Flex>
        <Flex direction='column' w='100%' justify='space-between'>
          <Flex w='100%' align='center' mb={10}>
            <Box w='18%'>
              <Text>Nombre</Text>
            </Box>
            <Box flex='1' w='50'>
              <Text textAlign='right'>Precio</Text>
            </Box>
            <Box flex='1'>
              <Text textAlign='left' ml='130px'>
                Disponible
              </Text>
            </Box>

            <Button
              leftIcon={<FaPlus />}
              bg='blue.500'
              color='white'
              _hover={{ bg: 'blue.200' }}
              onClick={() => {
                setTypeProduct(null);
                setSelectedProduct(null);
                reset({
                  nameProduct: '',
                  description: '',
                  price: '',
                  stock: '',
                  available: true
                });
                setImageFiles([]);
                onOpenNewProduct();
              }}
            >
              Nuevo producto
            </Button>
          </Flex>
          <Flex direction='column' w='100%' gap={4}>
            {products.products?.map((product, index) => {
              const bgProduct = !product.available
                ? 'red.200'
                : index % 2 === 0
                ? 'gray.100'
                : 'white';

              return (
                <Flex
                  key={product._id}
                  justify='space-between'
                  p={2}
                  bg={bgProduct}
                  _hover={{ bg: 'gray.300' }}
                  cursor='pointer'
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                    reset({
                      nameProduct: product.nameProduct,
                      description: product.description,
                      price: product.price,
                      stock: product.stock,
                      available: true
                    });
                    setImageFiles([]);
                    onOpenNewProduct();
                  }}
                >
                  <Box flex='1'>
                    <Text>{product.nameProduct}</Text>
                  </Box>

                  <Box flex='1'>
                    <Text textAlign='center' pr={10}>
                      € {product.price}
                    </Text>
                  </Box>
                  <Box flex='1' onClick={(e) => e.stopPropagation()}>
                    <Switcher
                      isChecked={product.available}
                      onChange={() =>
                        handleSwitch(product._id, product.available)
                      }
                    />
                  </Box>
                  <DeleteButton
                    item={product}
                    setSelectedItem={setSelectedProduct}
                    disabledCondition={!product.available}
                    onOpen={onOpen}
                  />
                </Flex>
              );
            })}

            <CustomModal
              isOpen={isOpen}
              onClose={() => {
                setSelectedProduct(null);
                onClose();
              }}
            >
              <Flex direction='column' mt={8}>
                <Text m={5}>
                  ¿Estás seguro de que quieres eliminar{' '}
                  {selectedProduct?.nameProduct}?
                </Text>
                <Flex justify='flex-end'>
                  <Button
                    onClick={() => {
                      setSelectedProduct(null);
                      onClose();
                    }}
                    mr={3}
                  >
                    Cancelar
                  </Button>
                  <Button colorScheme='red' onClick={confirmDelete}>
                    Elimminar
                  </Button>
                </Flex>
              </Flex>
            </CustomModal>

            <CustomModal
              isOpen={isOpenNewProduct}
              onClose={onCloseNewProduct}
              size='xl'
            >
              <Flex direction='column' align='center' mt={5}>
                <Heading textAlign='center' mb={3}>
                  {selectedProduct
                    ? 'Modificar producto'
                    : 'Crear nuevo producto'}
                </Heading>
                <form id='new-product-form' onSubmit={handleSubmit(onSubmit)}>
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
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) setImageFiles([file]);
                      }}
                    />
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
                      loadingText={
                        selectedProduct ? 'Modificando...' : 'Creando...'
                      }
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
          </Flex>
        </Flex>
      </Flex>
    </section>
  );
};

export default ProductsDash;
