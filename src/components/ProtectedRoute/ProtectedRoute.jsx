import { Navigate } from 'react-router-dom';
import { useUser } from '../../Providers/UserContext';
import { Spinner } from '@chakra-ui/react';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
