import { Flex, Text } from '@chakra-ui/react';
import './PaymentSuccess.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Ticket from '../../components/Ticket/Ticket';
import useCustomToast from '../../hooks/useCustomToast';

const PaymentSuccess = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useCustomToast();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');

  useEffect(() => {
    localStorage.removeItem('cartItems');
  }, []);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/v1/orders/${orderId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          }
        );

        if (!res.ok) throw new Error('No se pudo obtener la orden');

        const data = await res.json();
        setOrder(data);
      } catch (error) {
        showToast({
          title: 'Error al cargar el pedido.',
          description: error.message || 'Inténtalo de nuevo más tarde',
          status: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [location.search]);

  if (loading) return <p>Cargando pedido...</p>;
  if (!order) return <p>No se encontró el pedido.</p>;

  return (
    <main className='payment-success'>
      <Flex align='center' justify='center' direction='column'>
        <Text fontSize='2rem' p={4}>
          Pago Realizado ✅
        </Text>
        <Ticket order={order} />
      </Flex>
    </main>
  );
};

export default PaymentSuccess;
