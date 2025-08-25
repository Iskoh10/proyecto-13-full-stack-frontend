import { Flex, Icon, Text } from '@chakra-ui/react';
import HeadingDash from '../../components/HeadingDash/HeadingDash';
import { useDashboard } from '../../Providers/DashboardContext';
import { FaBox } from 'react-icons/fa';

const ProductsDash = () => {
  const { products } = useDashboard();
  return (
    <section className='main-dashboard'>
      <HeadingDash>Productos</HeadingDash>
      {console.log(products)}
      <Flex h='10svh' bg='white' borderRadius='10px' p={5} align='center'>
        <Icon as={FaBox} boxSize={12} color='blue.500' />
        <Flex direction='column' ml={5}>
          <Text fontSize='2rem' color='isc.darkAccent'>
            {products.info.count}
          </Text>
          <Text>Productos totales</Text>
        </Flex>
      </Flex>
    </section>
  );
};

export default ProductsDash;

//! Arreglar en el main dashboard que solo cuente los clientes no borrados, y los pedidos recientes de clientes no borrados.

//* Buscar estética, productos, habilitar/deshabilitar disponibilidad,  boton crear nuevo producto, boton eliminar producto, modificar producto. filtros por categoria.
