import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }
  return children;
};

export const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const role = user?.role;
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }
  if (role !== 'admin') {
    return <Navigate to='/dashboard' replace />;
  }
  return children;
};

export const CustomerRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const role = user?.role;
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }
  if (role === 'admin') {
    return <Navigate to='/admin' replace />;
  }
  return children;
};
