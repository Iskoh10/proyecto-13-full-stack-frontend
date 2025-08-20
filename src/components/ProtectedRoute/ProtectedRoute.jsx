import { Navigate } from 'react-router-dom';
import { useUser } from '../../Providers/UserContext';
import { Spinner } from '@chakra-ui/react';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
