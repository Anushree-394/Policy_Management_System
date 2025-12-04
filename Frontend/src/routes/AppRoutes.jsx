import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { ROLES } from '../utils/roles';

// Import pages (to be created by Members 4 & 5)
// These are placeholder imports - actual components will be created by UI team
import Home from '../components/Home';

/**
 * Application Routes Configuration
 * Defines all routes with their protection and role requirements
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<div>Login Page (To be created by Member 4)</div>} />
      <Route path="/register" element={<div>Register Page (To be created by Member 4)</div>} />
      
      {/* Protected Routes - Require Authentication */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requireAuth={true}>
            <div>Dashboard Page (To be created by Member 5)</div>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/policies"
        element={
          <ProtectedRoute requireAuth={true}>
            <div>Policies List Page (To be created by Member 5)</div>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/policies/:id"
        element={
          <ProtectedRoute requireAuth={true}>
            <div>Policy Detail Page (To be created by Member 5)</div>
          </ProtectedRoute>
        }
      />
      
      {/* Admin/Manager Only Routes */}
      <Route
        path="/policies/create"
        element={
          <ProtectedRoute
            requireAuth={true}
            requiredRoles={[ROLES.ADMIN, ROLES.MANAGER]}
          >
            <div>Create Policy Page (To be created by Member 5)</div>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/policies/:id/edit"
        element={
          <ProtectedRoute
            requireAuth={true}
            requiredRoles={[ROLES.ADMIN, ROLES.MANAGER]}
          >
            <div>Edit Policy Page (To be created by Member 5)</div>
          </ProtectedRoute>
        }
      />
      
      {/* Admin Only Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute
            requireAuth={true}
            requiredRoles={ROLES.ADMIN}
          >
            <div>Admin Panel (To be created by Member 5)</div>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/users"
        element={
          <ProtectedRoute
            requireAuth={true}
            requiredRoles={ROLES.ADMIN}
          >
            <div>User Management (To be created by Member 5)</div>
          </ProtectedRoute>
        }
      />
      
      {/* Error Routes */}
      <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
      <Route path="/404" element={<div>Page Not Found</div>} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;

