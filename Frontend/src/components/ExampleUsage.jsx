/**
 * Example Usage Component
 * Demonstrates how to use Redux, API services, and routing
 * This file serves as a reference for Members 4 & 5
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { loginUser, logoutUser, getCurrentUser } from '../store/slices/authSlice';
import { fetchPolicies, createPolicy, deletePolicy } from '../store/slices/policySlice';
import { hasRole, isAdmin, ROLES } from '../utils/roles';

const ExampleUsage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  // Get state from Redux store
  const { user, isAuthenticated, isLoading: authLoading } = useAppSelector(
    (state) => state.auth
  );
  const { policies, isLoading: policiesLoading } = useAppSelector(
    (state) => state.policy
  );

  // Example: Login user
  const handleLogin = async () => {
    try {
      await dispatch(
        loginUser({
          email: 'user@example.com',
          password: 'password123',
        })
      ).unwrap();
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Example: Logout user
  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  // Example: Fetch current user on mount
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getCurrentUser());
    }
  }, [isAuthenticated, user, dispatch]);

  // Example: Fetch policies
  const loadPolicies = async () => {
    try {
      await dispatch(fetchPolicies({ page: 1, limit: 10 })).unwrap();
    } catch (error) {
      console.error('Failed to load policies:', error);
    }
  };

  // Example: Create policy (requires admin/manager role)
  const handleCreatePolicy = async () => {
    if (!hasRole(user?.role, [ROLES.ADMIN, ROLES.MANAGER])) {
      alert('You do not have permission to create policies');
      return;
    }

    try {
      await dispatch(
        createPolicy({
          title: 'New Policy',
          description: 'Policy description',
          category: 'general',
        })
      ).unwrap();
      alert('Policy created successfully!');
    } catch (error) {
      console.error('Failed to create policy:', error);
    }
  };

  // Example: Delete policy
  const handleDeletePolicy = async (policyId) => {
    if (window.confirm('Are you sure you want to delete this policy?')) {
      try {
        await dispatch(deletePolicy(policyId)).unwrap();
        alert('Policy deleted successfully!');
      } catch (error) {
        console.error('Failed to delete policy:', error);
      }
    }
  };

  return (
    <div>
      <h1>Example Usage Component</h1>
      
      {/* Authentication Status */}
      <section>
        <h2>Authentication Status</h2>
        {authLoading ? (
          <p>Loading...</p>
        ) : isAuthenticated ? (
          <div>
            <p>Welcome, {user?.name || user?.email}!</p>
            <p>Role: {user?.role}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <p>Not logged in</p>
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </section>

      {/* Policies Section */}
      <section>
        <h2>Policies</h2>
        <button onClick={loadPolicies}>Load Policies</button>
        
        {hasRole(user?.role, [ROLES.ADMIN, ROLES.MANAGER]) && (
          <button onClick={handleCreatePolicy}>Create Policy</button>
        )}

        {policiesLoading ? (
          <p>Loading policies...</p>
        ) : (
          <ul>
            {policies.map((policy) => (
              <li key={policy.id}>
                <h3>{policy.title}</h3>
                <p>{policy.description}</p>
                {hasRole(user?.role, [ROLES.ADMIN, ROLES.MANAGER]) && (
                  <button onClick={() => handleDeletePolicy(policy.id)}>
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Role-based Content */}
      <section>
        <h2>Role-based Content</h2>
        {isAdmin(user?.role) && (
          <div>
            <p>Admin-only content visible</p>
            <button onClick={() => navigate('/admin')}>Go to Admin Panel</button>
          </div>
        )}
        
        {hasRole(user?.role, [ROLES.ADMIN, ROLES.MANAGER]) && (
          <div>
            <p>Manager/Admin content visible</p>
            <button onClick={() => navigate('/policies/create')}>
              Create Policy
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ExampleUsage;

