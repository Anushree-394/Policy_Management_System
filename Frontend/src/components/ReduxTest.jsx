import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { loginUser, registerUser } from '../features/auth/authThunks';
import { logout, clearError } from '../features/auth/authSlice';

/**
 * Redux Test Component
 * Demonstrates how to use the new Redux auth slice
 */
const ReduxTest = () => {
  const dispatch = useAppDispatch();
  
  // Get auth state from Redux
  const { user, token, isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  // Test login
  const handleLogin = async () => {
    try {
      await dispatch(
        loginUser({
          email: 'test@example.com',
          password: 'password123',
        })
      ).unwrap();
      console.log('Login successful!');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  // Test register
  const handleRegister = async () => {
    try {
      await dispatch(
        registerUser({
          email: 'newuser@example.com',
          password: 'password123',
          name: 'New User',
        })
      ).unwrap();
      console.log('Registration successful!');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  // Test logout
  const handleLogout = () => {
    dispatch(logout());
    console.log('Logged out!');
  };

  // Clear error
  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h2>Redux Auth Test Component</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Auth State:</h3>
        <p>Is Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
        <p>Is Loading: {isLoading ? 'Yes' : 'No'}</p>
        <p>Token: {token ? 'Present' : 'Not present'}</p>
        <p>User: {user ? JSON.stringify(user) : 'None'}</p>
        {error && (
          <p style={{ color: 'red' }}>
            Error: {error}
            <button onClick={handleClearError}>Clear Error</button>
          </p>
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={handleLogin} disabled={isLoading}>
          Test Login
        </button>
        <button onClick={handleRegister} disabled={isLoading}>
          Test Register
        </button>
        <button onClick={handleLogout} disabled={!isAuthenticated}>
          Logout
        </button>
      </div>

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p>Check browser console for API calls and responses</p>
        <p>Check Network tab to see JWT token in Authorization header</p>
      </div>
    </div>
  );
};

export default ReduxTest;

