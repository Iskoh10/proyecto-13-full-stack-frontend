import { Box, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
import HeadingDash from '../../components/HeadingDash/HeadingDash';
import { useDashboard } from '../../Providers/DashboardContext';
import { FaBox, FaBreadSlice, FaPlus } from 'react-icons/fa';
import { useRef, useState } from 'react';
import { GiCakeSlice, GiCroissant } from 'react-icons/gi';
import Switcher from '../../components/Switcher/Switcher';
import useCustomToast from '../../hooks/useCustomToast';
import { useForm } from 'react-hook-form';
import { useUser } from '../../Providers/UserContext';
import DeleteButton from '../../components/DeleteButton/DeleteButton';
import InfoCard from '../../components/InfoCard/InfoCard';
import SearchBox from '../../components/SearchBox/SearchBox';
import DashboardButton from '../../components/DashboardButton/DashboardButton';
import useCreateModForm from '../../hooks/useCreateModForm';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal/ConfirmDeleteModal';
import CreateModFormModal from '../../components/CreateModFormModal/CreateModFormModal';
import useSwitchAvailability from '../../hooks/useSwitchAvailability';
import useSearchResource from '../../hooks/useSearchResource';

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

  const { handleSearch } = useSearchResource({
    inputRef,
    setLoading,
    resource: 'products',
    setItems: setProducts,
    showToast
  });

  const handleSelect = (value) => {
    setTypeProduct(value);
  };

  const { onSubmit } = useCreateModForm({
    user,
    reset,
    setImageFiles,
    setSelectedItem: setSelectedProduct,
    onCloseNewItem: onCloseNewProduct,
    fetchResources,
    setItems: setProducts,
    showToast,
    setLoading
  });

  const { handleSwitch } = useSwitchAvailability({
    resource: 'products',
    setItems: setProducts,
    showToast
  });

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
          <DashboardButton
            onAction={() =>
              filterByCategory({ filter: 'allProducts', key: 'products' })
            }
            bg='blue.400'
            w='90%'
            color='white'
            _hover={{ bg: 'blue.300' }}
          >
            Todos los productos
          </DashboardButton>
          <DashboardButton
            onAction={() =>
              filterByCategory({ filter: 'panaderia', key: 'products' })
            }
            bg='isc.darkAccent'
            w='70%'
            color='white'
            _hover={{ bg: 'isc.accent' }}
          >
            <Icon
              as={FaBreadSlice}
              boxSize={6}
              color='white'
              title='Panadería'
              mr={5}
            />
            Panadería
          </DashboardButton>
          <DashboardButton
            onAction={() =>
              filterByCategory({ filter: 'bolleria', key: 'products' })
            }
            bg='isc.secondary'
            w='70%'
            color='white'
            _hover={{ bg: 'isc.accent' }}
          >
            <Icon
              as={GiCroissant}
              boxSize={6}
              color='white'
              title='Bollería'
              mr={5}
            />
            Bollería
          </DashboardButton>
          <DashboardButton
            onAction={() =>
              filterByCategory({ filter: 'pasteleria', key: 'products' })
            }
            bg='red.500'
            w='70%'
            color='white'
            _hover={{ bg: 'red.300' }}
          >
            <Icon
              as={GiCakeSlice}
              boxSize={6}
              color='white'
              title='Pastelería'
              mr={5}
            />
            Pastelería
          </DashboardButton>
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
            <DashboardButton
              onAction={() => {
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
              bg='blue.500'
              color='white'
              _hover={{ bg: 'blue.400' }}
            >
              <Icon
                as={FaPlus}
                boxSize={6}
                color='white'
                title='Nuevo Producto'
                mr={5}
              />
              Nuevo Producto
            </DashboardButton>
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
                      available: product.available
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

            <ConfirmDeleteModal
              isOpen={isOpen}
              onClose={() => {
                setSelectedProduct(null);
                onClose();
              }}
              textQuestion={`¿Estás seguro de que quieres eliminar ${selectedProduct?.nameProduct}?`}
              onAction={confirmDelete}
            />

            <CreateModFormModal
              isOpen={isOpenNewProduct}
              onClose={onCloseNewProduct}
              loading={loading.products}
              selectedItem={selectedProduct}
              labelTarget='producto'
              onSubmit={handleSubmit((data) =>
                onSubmit({
                  data,
                  imageFiles,
                  target: 'products',
                  typeProduct,
                  selectedItem: selectedProduct,
                  targetText: 'Producto'
                })
              )}
              errors={errors}
              register={register}
              imageFiles={imageFiles}
              typeProduct={typeProduct}
              handleSelect={handleSelect}
              onImageAction={(e) => {
                const file = e.target.files[0];
                if (file) setImageFiles([file]);
              }}
              fields={[
                {
                  name: 'nameProduct',
                  label: 'Nombre del producto',
                  type: 'text',
                  required: true
                },
                {
                  name: 'description',
                  label: 'Descripción',
                  type: 'text',
                  required: true
                },
                {
                  name: 'price',
                  label: 'Precio',
                  type: 'number',
                  step: '0.01',
                  required: true
                },
                {
                  name: 'stock',
                  label: 'Stock',
                  type: 'number',
                  required: true
                },
                {
                  name: 'images',
                  label: 'Imagen',
                  type: 'file',
                  required: true
                },
                { name: 'available', label: 'Disponible', type: 'checkbox' },
                {
                  name: 'typeProduct',
                  label: 'Tipo de producto',
                  type: 'selectMenu'
                }
              ]}
            />
          </Flex>
        </Flex>
      </Flex>
    </section>
  );
};

export default ProductsDash;
