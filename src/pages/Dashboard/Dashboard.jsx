import './Dashboard.css';
import { Flex, Heading } from '@chakra-ui/react';
import { useUser } from '../../Providers/UserContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useUser();
  return (
    <main className='dashboard'>
      <Heading textAlign='center' p={5}>
        Dashboard - Bienvenido {user.name}
      </Heading>
      <Link to='/products'>
        <Flex
          boxSize={50}
          border='5px solid  #000'
          borderRadius='50%'
          justify='center'
          align='center'
          position='fixed'
          top={2}
          right={2}
        >
          ❌
        </Flex>
      </Link>
    </main>
  );
};

export default Dashboard;
