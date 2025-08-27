import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Spinner,
  Stack,
  Text
} from '@chakra-ui/react';
import './Products.css';
import { useEffect, useState } from 'react';
import Rating from '../../components/Rating/Rating';
import updateProductRating from '../../service/updateProductRating';
import { useUser } from '../../Providers/UserContext';
import { AddToCartIcon } from '../../components/Icons/Icons';
import Cart from '../../components/Cart/Cart';
import { useFilterContext } from '../../Providers/FilterContext';
import useCustomToast from '../../hooks/useCustomToast';

const Products = () => {
  const [ratings, setRatings] = useState({});
  const { user } = useUser();
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [stockAdjusted, setStockAdjusted] = useState(false);
  const { showToast } = useCustomToast();
  const {
    products,
    setProducts,
    loading,
    filters,
    setFilters,
    pagination,
    refreshProducts
  } = useFilterContext();

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (products.length === 0 || stockAdjusted) return;

    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const inCart = cartItems.find((c) => c._id === p._id);
        return inCart ? { ...p, stock: p.stock - inCart.qty } : p;
      })
    );

    setStockAdjusted(true);
  }, [products, cartItems, stockAdjusted]);

  useEffect(() => {
    if (user?._id && products.length > 0) {
      const initialRatings = {};
      products.forEach((prod) => {
        const userRating =
          prod.ratings?.find((r) => String(r.userId) === String(user._id))
            ?.value || 0;
        initialRatings[prod._id] = userRating;
      });
      setRatings(initialRatings);
    }
  }, [products, user?._id]);

  const getDisplayText = () => {
    switch (filters.typeProduct) {
      case 'panaderia':
        return 'Panadería';
      case 'bolleria':
        return 'Bollería';
      case 'pasteleria':
        return 'Pastelería';
      case 'allProducts':
        return 'Todos los productos';
      default:
        return 'Selecciona una opción';
    }
  };

  const handleRatingChange = async (productId, value) => {
    try {
      await updateProductRating(productId, value, user._id);

      setRatings((prev) => ({
        ...prev,
        [productId]: value
      }));

      setProducts((prevProducts) =>
        prevProducts.map((prod) =>
          prod._id === productId
            ? {
                ...prod,
                ratings: [
                  ...prod.ratings.filter(
                    (r) => String(r.userId) !== String(user._id)
                  ),
                  { userId: user._id, value }
                ]
              }
            : prod
        )
      );
    } catch (error) {
      showToast({
        title: 'No se pudo actualizar la valoración',
        description: error.message || 'Inténtalo de nuevo más tarde.',
        status: 'error'
      });
    }
  };

  const getAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;

    const total = ratings.reduce((acc, rating) => acc + (rating.value || 0), 0);
    return (total / ratings.length).toFixed(1);
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const found = prev.find((item) => item._id === product._id);
      return found
        ? prev.map((item) =>
            item._id === product._id ? { ...item, qty: item.qty + 1 } : item
          )
        : [...prev, { ...product, qty: 1 }];
    });

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p._id === product._id ? { ...p, stock: p.stock - 1 } : p
      )
    );
  };

  const deleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p._id === productId
          ? {
              ...p,
              stock:
                p.stock + cartItems.find((item) => item._id === productId).qty
            }
          : p
      )
    );

    setCartItems((prevCart) =>
      prevCart.filter((item) => item._id !== productId)
    );
  };

  const increaseQty = (productId) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, qty: item.qty + 1 } : item
      )
    );

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p._id === productId ? { ...p, stock: p.stock - 1 } : p
      )
    );
  };

  const decreaseQty = (productId) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, qty: item.qty - 1 } : item
      )
    );

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p._id === productId ? { ...p, stock: p.stock + 1 } : p
      )
    );
  };

  const clearCart = () => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const inCart = cartItems.find((c) => c._id === p._id);
        return inCart ? { ...p, stock: p.stock + inCart.qty } : p;
      })
    );
    setCartItems([]);
  };

  if (loading)
    return (
      <Stack align='center' justify='center' height='100svh'>
        <Spinner size='xl' color='red' />
      </Stack>
    );

  return (
    <main className='products'>
      {user?._id && (
        <Flex justify='space-between' align='center' p={4}>
          <Flex align='center'>
            <Text mx={2}>Categoría:</Text>
            <Menu>
              <MenuButton
                as={Box}
                m={2}
                p={2}
                bg='white'
                _hover={{ bg: 'gray.200' }}
                borderRadius='md'
                cursor='pointer'
              >
                {getDisplayText()}
              </MenuButton>
              <MenuList placement='bottom-start'>
                <MenuItem
                  onClick={() => setFilters({ typeProduct: 'allProducts' })}
                >
                  Todos los productos
                </MenuItem>
                <MenuItem
                  onClick={() => setFilters({ typeProduct: 'panaderia' })}
                >
                  Panadería
                </MenuItem>
                <MenuItem
                  onClick={() => setFilters({ typeProduct: 'bolleria' })}
                >
                  Bollería
                </MenuItem>
                <MenuItem
                  onClick={() => setFilters({ typeProduct: 'pasteleria' })}
                >
                  Pastelería
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Cart
            items={cartItems}
            onClear={clearCart}
            onIncreaseQty={increaseQty}
            onDecreaseQty={decreaseQty}
            onDelete={deleteProduct}
            user={user}
          />
        </Flex>
      )}

      <Heading align='center' py='4'>
        Nuestros Productos
      </Heading>
      <Grid
        templateColumns='repeat(auto-fit, minmax(200px, 1fr))'
        justifyContent='center'
        gap='6'
        p='2'
        maxW='1200px'
        mx='auto'
      >
        {products.map((item) => {
          return (
            <Flex
              className='product-card'
              direction='column'
              key={item._id}
              bg='gray.100'
              p='4'
              borderRadius='md'
              style={{
                pointerEvents: item.available ? 'auto' : 'none',
                opacity: item.available ? 1 : 0.5
              }}
              align='center'
              justify='space-between'
            >
              <Heading
                fontWeight='bold'
                fontSize={{ base: 'sm', md: 'md', lg: 'xl' }}
                pb='2'
                textAlign='center'
              >
                {item.nameProduct}
              </Heading>
              <Image src={item.productImage} boxSize='100px' />
              <Flex gap='5' justify='center' align='end' width='100%' mt='5'>
                <Text>{item.price.toFixed(2) + ' €'}</Text>
                <Text>{'Stock: ' + item.stock}</Text>
              </Flex>
              <Text>{getAverageRating(item.ratings)} 🌟</Text>
              {user?._id && (
                <>
                  <Rating
                    rating={ratings[item._id] || 0}
                    onChange={(value) => handleRatingChange(item._id, value)}
                  />
                  <Spacer />
                  <Button onClick={() => addToCart(item)}>
                    <AddToCartIcon />
                  </Button>
                </>
              )}
            </Flex>
          );
        })}
      </Grid>
      <Spacer />
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
    </main>
  );
};

export default Products;
