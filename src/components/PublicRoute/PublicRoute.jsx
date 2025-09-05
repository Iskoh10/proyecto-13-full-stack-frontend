import { useUser } from '../../Providers/UserContext';
import { Spinner } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <Spinner />;
  }

  if (user) {
    return <Navigate to='/products' replace />;
  }
  return <>{children}</>;
};

export default PublicRoute;
