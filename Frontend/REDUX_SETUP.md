# Redux Auth Slice & Store Setup

## ✅ Files Created

### 1. `src/app/store.js`
- Redux store configuration using `configureStore` from `@reduxjs/toolkit`
- Combines auth reducer
- Exported as default

### 2. `src/features/auth/authSlice.js`
- Redux slice for authentication state management
- **State:**
  - `user`: null
  - `token`: from localStorage or null
  - `isLoading`: false
  - `error`: null
  - `isAuthenticated`: based on localStorage token
- **Reducers:**
  - `logout`: Clears user, token, isAuthenticated, and localStorage
  - `clearError`: Clears error state
- **Extra Reducers:**
  - `loginUser.pending`: Sets isLoading=true, error=null
  - `loginUser.fulfilled`: Sets user, token, isAuthenticated=true, saves to localStorage
  - `loginUser.rejected`: Sets error=action.payload
  - `registerUser.pending`: Sets isLoading=true, error=null
  - `registerUser.fulfilled`: Sets user, token, isAuthenticated=true, saves to localStorage
  - `registerUser.rejected`: Sets error=action.payload

### 3. `src/features/auth/authThunks.js`
- Async thunks for authentication operations
- **loginUser({email, password})**: Calls authAPI.login(), returns response on success, rejects with error message on failure
- **registerUser(userData)**: Calls authAPI.register(), returns response on success, rejects with error message on failure

## 📁 File Structure

```
src/
├── app/
│   └── store.js              # Redux store configuration
├── features/
│   └── auth/
│       ├── authSlice.js      # Auth slice with state and reducers
│       └── authThunks.js     # Async thunks for API calls
└── main.jsx                  # Updated to use new store
```

## 🔧 Integration

### Updated Files:
- ✅ `src/main.jsx` - Now imports from `./app/store`
- ✅ `src/services/axios.js` - Now uses `logout` action from new authSlice

## 📖 Usage Examples

### Using Auth Thunks in Components

```jsx
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { loginUser, registerUser } from '../features/auth/authThunks';
import { logout, clearError } from '../features/auth/authSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const { user, token, isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  // Login
  const handleLogin = async () => {
    try {
      await dispatch(
        loginUser({
          email: 'user@example.com',
          password: 'password123',
        })
      ).unwrap();
      console.log('Login successful!');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  // Register
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

  // Logout
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name || user?.email}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}
```

## 🧪 Testing

### Test Component Available
A test component is available at `src/components/ReduxTest.jsx` that demonstrates:
- Login functionality
- Register functionality
- Logout functionality
- Error handling
- State display

### To Test:

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Add ReduxTest component to your App.jsx temporarily:**
   ```jsx
   import ReduxTest from './components/ReduxTest';
   
   // In your App component:
   <ReduxTest />
   ```

3. **Check the following:**
   - ✅ State updates correctly when logging in/registering
   - ✅ Token is saved to localStorage
   - ✅ Error handling works on failed requests
   - ✅ Logout clears state and localStorage
   - ✅ JWT token is added to API requests (check Network tab)

### Expected Behavior:

- **On Login Success:**
  - `isAuthenticated` becomes `true`
  - `user` is set with user data
  - `token` is set and saved to localStorage
  - `isLoading` becomes `false`

- **On Login Failure:**
  - `error` is set with error message
  - `isLoading` becomes `false`
  - `isAuthenticated` remains `false`

- **On Logout:**
  - `user` becomes `null`
  - `token` becomes `null`
  - `isAuthenticated` becomes `false`
  - localStorage is cleared

## 🔍 Verification Checklist

- [x] Store is configured correctly
- [x] Auth slice has correct initial state
- [x] Login thunk calls authAPI.login()
- [x] Register thunk calls authAPI.register()
- [x] Reducers handle pending/fulfilled/rejected states
- [x] Logout clears state and localStorage
- [x] Token is saved to localStorage on successful login/register
- [x] Build passes without errors
- [x] No linter errors

## 📝 Notes

- The auth slice automatically saves tokens to localStorage on successful login/register
- The logout reducer clears both state and localStorage
- Error messages come from the API response or default messages
- The axios interceptor will automatically dispatch logout on 401 errors

