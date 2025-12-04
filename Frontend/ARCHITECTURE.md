# Policy Management System - Frontend Architecture

## Overview

This document describes the complete React frontend architecture set up by **Member 3 (Frontend Lead & Integrator)**. The architecture includes Redux for state management, Axios for API calls, React Router for navigation, and role-based route protection.

## Project Structure

```
Frontend/
├── src/
│   ├── components/          # React components (for Members 4 & 5)
│   │   ├── Home/           # Existing home component
│   │   └── Layout/         # Main layout wrapper
│   ├── services/           # API service layer
│   │   ├── api.js          # Axios instance with JWT interceptors
│   │   ├── authService.js  # Authentication API calls
│   │   └── policyService.js # Policy API calls
│   ├── store/              # Redux store configuration
│   │   ├── store.js        # Store setup
│   │   └── slices/         # Redux slices
│   │       ├── authSlice.js    # Authentication state
│   │       └── policySlice.js  # Policy state
│   ├── routes/             # Routing configuration
│   │   ├── AppRoutes.jsx       # Route definitions
│   │   └── ProtectedRoute.jsx # Route protection component
│   ├── hooks/              # Custom React hooks
│   │   └── redux.js        # Typed Redux hooks
│   ├── utils/              # Utility functions
│   │   └── roles.js        # Role checking utilities
│   ├── constants/          # Application constants
│   │   └── api.js          # API endpoint definitions
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Application entry point
```

## Key Features

### 1. Redux State Management

The application uses Redux Toolkit for state management with two main slices:

#### Auth Slice (`store/slices/authSlice.js`)
- Manages user authentication state
- Handles login, register, logout, and current user fetching
- Automatically stores/retrieves tokens from localStorage
- State includes: `user`, `token`, `refreshToken`, `isAuthenticated`, `isLoading`, `error`

#### Policy Slice (`store/slices/policySlice.js`)
- Manages policy-related state
- Handles CRUD operations for policies
- Includes filtering and pagination state
- State includes: `policies`, `currentPolicy`, `isLoading`, `error`, `filters`, `pagination`

### 2. API Service Layer

#### Axios Instance (`services/api.js`)
- Configured with base URL: `http://localhost:5000/api`
- **Request Interceptor**: Automatically adds JWT token to all requests
- **Response Interceptor**: Handles token refresh on 401 errors
- Automatically redirects to login on authentication failure

#### Service Files
- `authService.js`: Authentication-related API calls
- `policyService.js`: Policy-related API calls

### 3. Routing System

#### Route Protection (`routes/ProtectedRoute.jsx`)
- Protects routes based on authentication status
- Supports role-based access control
- Automatically redirects unauthorized users

#### Route Definitions (`routes/AppRoutes.jsx`)
- Public routes: `/`, `/login`, `/register`
- Protected routes: `/dashboard`, `/policies`, `/policies/:id`
- Admin/Manager routes: `/policies/create`, `/policies/:id/edit`
- Admin-only routes: `/admin`, `/users`

### 4. Role-Based Access Control

#### Role Utilities (`utils/roles.js`)
- Defines roles: `ADMIN`, `MANAGER`, `USER`, `VIEWER`
- Helper functions: `hasRole()`, `isAdmin()`, `isManagerOrAdmin()`

## Usage Examples

### Using Redux in Components

```jsx
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { loginUser } from '../store/slices/authSlice';
import { fetchPolicies } from '../store/slices/policySlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { policies, isLoading } = useAppSelector((state) => state.policy);

  const handleLogin = async () => {
    await dispatch(loginUser({ email: 'user@example.com', password: 'password' }));
  };

  const loadPolicies = async () => {
    await dispatch(fetchPolicies());
  };

  return (
    <div>
      {isAuthenticated ? <p>Welcome, {user.name}</p> : <p>Please login</p>}
      {isLoading ? <p>Loading...</p> : <p>{policies.length} policies</p>}
    </div>
  );
}
```

### Using API Services Directly

```jsx
import { authService } from '../services/authService';
import { policyService } from '../services/policyService';

// Login
const response = await authService.login({ email, password });

// Get policies
const policies = await policyService.getAllPolicies();

// Create policy
const newPolicy = await policyService.createPolicy(policyData);
```

### Creating Protected Routes

```jsx
import ProtectedRoute from '../routes/ProtectedRoute';
import { ROLES } from '../utils/roles';

// Require authentication
<ProtectedRoute requireAuth={true}>
  <MyComponent />
</ProtectedRoute>

// Require specific role
<ProtectedRoute requireAuth={true} requiredRoles={ROLES.ADMIN}>
  <AdminComponent />
</ProtectedRoute>

// Require multiple roles
<ProtectedRoute requireAuth={true} requiredRoles={[ROLES.ADMIN, ROLES.MANAGER]}>
  <ManagerComponent />
</ProtectedRoute>
```

### Checking User Roles

```jsx
import { useAppSelector } from '../hooks/redux';
import { hasRole, isAdmin } from '../utils/roles';

function MyComponent() {
  const { user } = useAppSelector((state) => state.auth);
  const userRole = user?.role;

  if (isAdmin(userRole)) {
    // Show admin content
  }

  if (hasRole(userRole, [ROLES.ADMIN, ROLES.MANAGER])) {
    // Show manager/admin content
  }
}
```

## Backend Integration

The frontend is configured to connect to the backend API at:
- **Base URL**: `http://localhost:5000/api`

### Expected API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh access token

#### Policies
- `GET /api/policies` - Get all policies
- `GET /api/policies/:id` - Get policy by ID
- `POST /api/policies` - Create new policy
- `PUT /api/policies/:id` - Update policy
- `DELETE /api/policies/:id` - Delete policy
- `GET /api/policies/category/:category` - Get policies by category
- `GET /api/policies/search?q=query` - Search policies

### Expected Response Formats

#### Login/Register Response
```json
{
  "token": "jwt_access_token",
  "refreshToken": "jwt_refresh_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "user"
  }
}
```

#### Policy Response
```json
{
  "policies": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

## Development Workflow

### Starting the Development Server

```bash
cd Frontend
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

### Building for Production

```bash
npm run build
```

### Running Linter

```bash
npm run lint
```

## Next Steps for Team Members

### Member 4 (UI Component Builder)
- Create reusable UI components (buttons, forms, cards, etc.)
- Build authentication pages (Login, Register)
- Design and implement navigation/header components
- Create layout components (sidebar, footer, etc.)

### Member 5 (Page Builder)
- Build Dashboard page
- Create Policy list and detail pages
- Implement Policy create/edit forms
- Build Admin panel and User management pages
- Create error pages (404, Unauthorized)

## Notes

- All API calls automatically include JWT tokens via interceptors
- Tokens are stored in localStorage
- Failed authentication automatically redirects to login
- Role-based route protection is implemented and ready to use
- Redux state is properly typed and structured
- All routes are defined but most pages are placeholders for Members 4 & 5

## Dependencies

- `react` ^19.2.0
- `react-dom` ^19.2.0
- `@reduxjs/toolkit` - Redux state management
- `react-redux` - React bindings for Redux
- `react-router-dom` - Routing
- `axios` - HTTP client

