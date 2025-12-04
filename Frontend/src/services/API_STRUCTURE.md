# API Layer Structure

## Overview

The API layer is organized into a centralized Axios instance and separate API modules for different domains.

## File Structure

```
src/services/
├── axios.js              # Centralized Axios instance with interceptors
└── api/
    ├── authAPI.js        # Authentication API methods
    ├── policiesAPI.js    # Policies API methods
    └── claimsAPI.js      # Claims API methods
```

## Centralized Axios Instance (`axios.js`)

### Features:
- **Base URL**: `http://localhost:5000/api`
- **Request Interceptor**: Automatically adds JWT token from localStorage to `Authorization` header
- **Response Interceptor**: On 401 error, dispatches logout action and redirects to `/login`

### Usage:
```javascript
import axiosInstance from '../services/axios';
```

## API Modules

### 1. Authentication API (`api/authAPI.js`)

**Methods:**
- `login(email, password)` - POST `/auth/login`
- `register(userData)` - POST `/auth/register`
- `verifyToken()` - GET `/auth/verify`

**Usage:**
```javascript
import authAPI from '../services/api/authAPI';

// Login
const response = await authAPI.login('user@example.com', 'password123');

// Register
const response = await authAPI.register({ email, password, name });

// Verify token
const response = await authAPI.verifyToken();
```

### 2. Policies API (`api/policiesAPI.js`)

**Methods:**
- `fetchPolicies()` - GET `/policies`
- `getPolicyById(id)` - GET `/policies/{id}`
- `createPolicy(policyData)` - POST `/policies`
- `getProducts()` - GET `/products`
- `calculatePremium(calculationData)` - POST `/premium/calculate`

**Usage:**
```javascript
import policiesAPI from '../services/api/policiesAPI';

// Fetch all policies
const policies = await policiesAPI.fetchPolicies();

// Get policy by ID
const policy = await policiesAPI.getPolicyById(123);

// Create policy
const newPolicy = await policiesAPI.createPolicy({ title, description });

// Get products
const products = await policiesAPI.getProducts();

// Calculate premium
const premium = await policiesAPI.calculatePremium({ productId, coverage });
```

### 3. Claims API (`api/claimsAPI.js`)

**Methods:**
- `fileClaim(claimData)` - POST `/claims`
- `getUserClaims()` - GET `/claims/my`
- `getClaimById(id)` - GET `/claims/{id}`

**Usage:**
```javascript
import claimsAPI from '../services/api/claimsAPI';

// File a claim
const claim = await claimsAPI.fileClaim({ policyId, description, amount });

// Get user's claims
const claims = await claimsAPI.getUserClaims();

// Get claim by ID
const claim = await claimsAPI.getClaimById(456);
```

## Response Format

All API methods return `response.data` directly, so you can use the data immediately:

```javascript
const data = await authAPI.login(email, password);
// data contains the response data directly
```

## Error Handling

- **401 Unauthorized**: Automatically handled by the response interceptor
  - Dispatches `clearCredentials()` action
  - Clears tokens from localStorage
  - Redirects to `/login`

- **Other Errors**: Should be handled in the component/service layer:

```javascript
try {
  const data = await authAPI.login(email, password);
} catch (error) {
  console.error('Login failed:', error.response?.data?.message || error.message);
}
```

## Integration with Redux

The axios instance imports the Redux store to dispatch logout actions on 401 errors:

```javascript
import { store } from '../store/store';
import { clearCredentials } from '../store/slices/authSlice';

// In interceptor:
store.dispatch(clearCredentials());
```

## Notes

- All API methods use the centralized `axiosInstance` from `axios.js`
- JWT tokens are automatically included in all requests
- Base URL is configured once in `axios.js`
- All methods return `response.data` for convenience

