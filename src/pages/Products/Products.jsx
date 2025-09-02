import {
  Flex,
  Grid,
  Heading,
  Spacer,
  Spinner,
  Stack,
  Text
} from '@chakra-ui/react';
import './Products.css';
import { useEffect, useState } from 'react';
import { useUser } from '../../Providers/UserContext';
import Cart from '../../components/Cart/Cart';
import { useFilterContext } from '../../Providers/FilterContext';
import useCustomToast from '../../hooks/useCustomToast';
import useRatings from '../../hooks/useRatings';
import clearCart from '../../utils/cartUtils/clearCart';
import MenuProductType from '../../components/MenuProductTyoe/MenuProductType';
import CardProduct from '../../components/CardProduct/CardProduct';
import ProductsPagination from '../../components/ProductsPagination/ProductsPagination';

const Products = () => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [stockAdjusted, setStockAdjusted] = useState(false);
  const { showToast } = useCustomToast();
  const { products, setProducts, loading, pagination, refreshProducts } =
    useFilterContext();

  const { ratings, setRatings, handleRatingChange } = useRatings(
    setProducts,
    showToast,
    user
  );

  useEffect(() => {
    refreshProducts(1);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (products?.length === 0 || stockAdjusted) return;

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

  const handleCart = (product, action) => {
    let newCart, newProducts;

    if (action === clearCart) {
      ({ newCart, newProducts } = action(products, cartItems));
    } else {
      ({ newCart, newProducts } = action(product, products, cartItems));
    }
    setCartItems(newCart);
    setProducts(newProducts);
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
            <MenuProductType />
          </Flex>
          <Cart
            items={cartItems}
            onClear={() => handleCart(null, clearCart)}
            onIncreaseQty={handleCart}
            onDecreaseQty={handleCart}
            onDelete={handleCart}
            user={user}
          />
        </Flex>
      )}

      <Heading align='center' py='4'>
        Nuestros Productos
      </Heading>
      <Grid
        templateColumns='repeat(auto-fill, minmax(300px, 1fr))'
        gap='6'
        p='2'
        justifyContent='center'
        justifyItems='center'
      >
        {products.map((item) => {
          return (
            <CardProduct
              key={item._id}
              item={item}
              user={user}
              ratings={ratings}
              handleRatingChange={handleRatingChange}
            />
          );
        })}
      </Grid>
      <Spacer />
      <ProductsPagination
        pagination={pagination}
        refreshProducts={refreshProducts}
      />
    </main>
  );
};

export default Products;
