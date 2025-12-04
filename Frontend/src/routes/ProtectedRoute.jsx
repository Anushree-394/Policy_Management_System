import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { hasRole } from '../utils/roles';

/**
 * Protected Route Component
 * Protects routes based on authentication and role requirements
 * 
 * @param {React.ReactNode} children - Child components to render
 * @param {boolean} requireAuth - Whether authentication is required
 * @param {string|string[]} requiredRoles - Required role(s) for access
 * @param {string} redirectTo - Path to redirect if access denied
 */
const ProtectedRoute = ({
  children,
  requireAuth = true,
  requiredRoles = null,
  redirectTo = '/login',
}) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If role is required, check if user has the required role
  if (requiredRoles && user) {
    const userRole = user.role || user.userRole;
    if (!hasRole(userRole, requiredRoles)) {
      // Redirect to unauthorized page or home
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;

