import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Spinner,
  Text,
  Textarea,
  VStack
} from '@chakra-ui/react';
import {
  BuyCartIcon,
  CartIcon,
  ClearCartIcon,
  RemoveFromCartIcon
} from '../Icons/Icons';
import { useState } from 'react';
import useCustomToast from '../../hooks/useCustomToast';
import { loadStripe } from '@stripe/stripe-js';
import deleteProductCart from '../../utils/cartUtils/deleteProductCart';
import decreaseQty from '../../utils/cartUtils/decreaseQty';
import increaseQty from '../../utils/cartUtils/increaseQty';
import clearCart from '../../utils/cartUtils/clearCart';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Cart = ({
  items = [],
  onClear,
  onIncreaseQty,
  onDecreaseQty,
  onDelete,
  user
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useCustomToast();
  const [notes, setNotes] = useState(null);

  const calculateTotals = (items) => {
    let subtotal = 0;
    let totalIVA = 0;

    items.forEach((item) => {
      let ivaRate = 0;

      if (item.typeProduct === 'panaderia') ivaRate = 0.04;
      else if (item.typeProduct === 'bolleria') ivaRate = 0.21;
      else ivaRate = 0;

      const itemSubtotal = (item.price * item.qty) / (1 + ivaRate);
      const itemIVA = item.price * item.qty - itemSubtotal;

      subtotal += itemSubtotal;
      totalIVA += itemIVA;
    });
    const total = subtotal + totalIVA;
    return { subtotal, totalIVA, total };
  };

  const { subtotal, totalIVA, total } = calculateTotals(items);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'http://localhost:3000/api/payments/checkout-session',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cart: items,
            email: user?.email,
            notes: notes,
            successUrl: 'http://localhost:5173/success',
            cancelUrl: 'http://localhost:5173/cancel'
          })
        }
      );

      const { id } = await res.json();

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'No se pudo iniciar el pago. Intenta de nuevo.',
        status: 'error'
      });
      setLoading(false);
    }
  };

  return (
    <Box position='relative' display='inline-block'>
      <Button
        h='60px'
        variant='solid'
        leftIcon={<CartIcon />}
        aria-label='Cart'
        onClick={() => setIsOpen(!isOpen)}
      >
        Carrito
        <Badge
          ml={2}
          colorScheme='red'
          borderRadius='full'
          minW='20px'
          textAlign='center'
          visibility={items.length > 0 ? 'visible' : 'hidden'}
        >
          {items.length}
        </Badge>
      </Button>

      {isOpen && (
        <Box
          position='absolute'
          top='100%'
          right={{ base: 'auto', md: '0' }}
          left={{ base: '0', md: 'auto' }}
          w={{ base: '300px', md: '400px' }}
          bg='white'
          border='1px solid'
          borderColor='gray.200'
          borderRadius='md'
          mt={2}
          p={4}
          shadow='md'
          zIndex={10}
        >
          <VStack align='stretch' spacing={4}>
            {items.length === 0 ? (
              <Text textAlign='center'>Carrito vacío</Text>
            ) : (
              items.map((item, index) => (
                <Box
                  key={index}
                  borderBottom='1px solid'
                  borderColor='gray.200'
                  pb={2}
                >
                  <HStack spacing={3}>
                    <IconButton
                      icon={<RemoveFromCartIcon boxSize={4} />}
                      colorScheme='red'
                      onClick={() => onDelete(item, deleteProductCart)}
                      size='xs'
                      aria-label='Eliminar del carrito'
                    />
                    <Image
                      src={item.productImage}
                      alt={item.nameProduct}
                      boxSize='50px'
                      objectFit='cover'
                      display={{ base: 'none', md: 'block' }}
                    />
                    <Box flex='1'>
                      <Text fontWeight='bold'>{item.nameProduct}</Text>
                      <Text>€ {item.price}</Text>
                    </Box>
                    <VStack spacing={1}>
                      <Text>Qty: {item.qty}</Text>
                      <Flex gap={2}>
                        <Button
                          size='xs'
                          onClick={() => onDecreaseQty(item, decreaseQty)}
                          isDisabled={item.qty === 0}
                        >
                          -
                        </Button>
                        <Button
                          size='xs'
                          onClick={() => onIncreaseQty(item, increaseQty)}
                          isDisabled={item.qty >= item.stock}
                        >
                          +
                        </Button>
                      </Flex>
                    </VStack>
                  </HStack>
                </Box>
              ))
            )}

            {items.length > 0 && (
              <>
                <Box mt={4} p={4} border='1px solid #ccc' borderRadius='md'>
                  <Text>Subtotal: € {subtotal.toFixed(2)}</Text>
                  <Text>IVA: € {totalIVA.toFixed(2)}</Text>
                  <Text fontSize='lg' color='green'>
                    Total a pagar: € {total.toFixed(2)}
                  </Text>
                </Box>

                <Box mt={4} p={4} border='1px solid #ccc' borderRadius='md'>
                  <Textarea
                    height='100px'
                    placeholder='Indica el día de entrega, y cualquier detalle que tengamos que saber...'
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </Box>
                <Flex direction='column' gap={2}>
                  <Button
                    leftIcon={
                      loading ? (
                        <Spinner size='sm' />
                      ) : (
                        <BuyCartIcon boxSize={4} />
                      )
                    }
                    colorScheme='blue'
                    onClick={handleCheckout}
                    w='full'
                    isLoading={loading}
                    loadingText='Redirigiendo...'
                  >
                    {!loading && 'Comprar'}
                  </Button>
                  <Button
                    leftIcon={<ClearCartIcon />}
                    colorScheme='red'
                    onClick={() => onClear(clearCart)}
                    w='full'
                    isDisabled={loading}
                  >
                    Limpiar Carrito
                  </Button>
                </Flex>
              </>
            )}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
