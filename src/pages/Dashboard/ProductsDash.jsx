import {
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import HeadingDash from '../../components/HeadingDash/HeadingDash';
import { useDashboard } from '../../Providers/DashboardContext';
import { FaBox, FaBreadSlice, FaPlus, FaTrash } from 'react-icons/fa';
import { useRef, useState } from 'react';
import { GiCakeSlice, GiCroissant } from 'react-icons/gi';
import Switcher from '../../components/Switcher/Switcher';
import useCustomToast from '../../hooks/useCustomToast';
import CustomModal from '../../components/CustomModal/CustomModal';

const ProductsDash = () => {
  const {
    products,
    setProducts,
    fetchResources,
    filterByCategory,
    deleteResources
  } = useDashboard();

  const inputRef = useRef();
  const { showToast } = useCustomToast();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = () => {
    const search = inputRef.current.value;
    if (!search.trim()) return;

    fetchResources(
      `http://localhost:3000/api/v1/products/filter?nameProduct=${encodeURIComponent(
        search
      )}`,
      setProducts,
      'products'
    );

    inputRef.current.value = '';
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
          p._id === productId ? data.updated : p
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
      {console.log(products)}
      <Flex gap={10} align='center' mb={10}>
        <Flex
          h='10svh'
          bg='white'
          borderRadius='10px'
          p={5}
          align='center'
          w='25%'
        >
          <Icon as={FaBox} boxSize={12} color='blue.500' />
          <Flex direction='column' ml={5}>
            <Text fontSize='2rem' color='isc.darkAccent'>
              {products.products?.length}
            </Text>
            <Text>Productos totales</Text>
          </Flex>
        </Flex>
        <InputGroup w='50%'>
          <Input
            type='search'
            placeholder='Buscar producto...'
            ref={inputRef}
          />
          <Button ml={2} colorScheme='blue' onClick={handleSearch}>
            Buscar
          </Button>
        </InputGroup>
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
            <Box flex='1'>
              <Text>Nombre</Text>
            </Box>
            <Box flex='1' w='50'>
              <Text textAlign='right'>Precio</Text>
            </Box>
            <Box flex='1'>
              <Text textAlign='right' mr={5}>
                Disponible
              </Text>
            </Box>

            <Button
              leftIcon={<FaPlus />}
              bg='blue.500'
              color='white'
              _hover={{ bg: 'blue.200' }}
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
                >
                  <Box flex='1'>
                    <Text>{product.nameProduct}</Text>
                  </Box>

                  <Box flex='1'>
                    <Text textAlign='center' pr={10}>
                      € {product.price}
                    </Text>
                  </Box>
                  <Box flex='1'>
                    <Switcher
                      isChecked={product.available}
                      onChange={() =>
                        handleSwitch(product._id, product.available)
                      }
                    />
                  </Box>

                  <IconButton
                    aria-label='Eliminar usuario'
                    icon={<FaTrash />}
                    colorScheme='red'
                    size='xs'
                    isDisabled={!product.available}
                    onClick={() => {
                      setSelectedProduct(product);
                      onOpen();
                    }}
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
          </Flex>
        </Flex>
      </Flex>
    </section>
  );
};

export default ProductsDash;

//! implementar la busqueda por precio, boton crear nuevo producto etc.
