# Frontend Setup Guide

## Quick Start

### 1. Install Dependencies

All required dependencies have been installed. If you need to reinstall:

```bash
cd Frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 3. Verify Backend Connection

Ensure the backend API is running at `http://localhost:5000/api`

## Project Structure Overview

```
Frontend/src/
├── components/        # React components (for Members 4 & 5)
├── services/         # API service layer (✅ Complete)
├── store/            # Redux store & slices (✅ Complete)
├── routes/           # Routing configuration (✅ Complete)
├── hooks/            # Custom hooks (✅ Complete)
├── utils/            # Utility functions (✅ Complete)
└── constants/        # App constants (✅ Complete)
```

## What's Already Set Up

✅ **Redux Store** - Auth and Policy slices with async thunks
✅ **Axios API Layer** - Configured with JWT interceptors
✅ **React Router** - Route definitions with role-based protection
✅ **Authentication Flow** - Login, register, logout, token refresh
✅ **Role-Based Access Control** - Utilities and route protection
✅ **API Services** - Auth and Policy service functions

## What Needs to Be Built

### Member 4 (UI Component Builder)
- [ ] Login page component
- [ ] Register page component
- [ ] Navigation/Header component
- [ ] Reusable UI components (buttons, forms, cards, modals)
- [ ] Layout enhancements (sidebar, footer)

### Member 5 (Page Builder)
- [ ] Dashboard page
- [ ] Policy list page
- [ ] Policy detail page
- [ ] Policy create/edit forms
- [ ] Admin panel
- [ ] User management page
- [ ] Error pages (404, Unauthorized)

## Testing the Setup

### Test Authentication Flow

1. Navigate to `/login` (placeholder page)
2. Use Redux dispatch to test login:
```jsx
import { useAppDispatch } from '../hooks/redux';
import { loginUser } from '../store/slices/authSlice';

const dispatch = useAppDispatch();
await dispatch(loginUser({ email: 'test@example.com', password: 'password' }));
```

### Test API Connection

Check browser console for:
- Network requests to `http://localhost:5000/api`
- JWT token in request headers
- Automatic token refresh on 401 errors

### Test Route Protection

1. Try accessing `/dashboard` without logging in (should redirect to `/login`)
2. Try accessing `/admin` as non-admin user (should redirect to `/unauthorized`)

## Common Tasks

### Adding a New API Endpoint

1. Add method to appropriate service file (`services/authService.js` or `services/policyService.js`)
2. Use the `api` instance from `services/api.js`

Example:
```javascript
// In services/policyService.js
export const getPolicyStats = async () => {
  const response = await api.get('/policies/stats');
  return response.data;
};
```

### Adding a New Redux Slice

1. Create new slice file in `store/slices/`
2. Add reducer to `store/store.js`
3. Export actions and selectors

### Adding a New Protected Route

1. Add route to `routes/AppRoutes.jsx`
2. Wrap with `ProtectedRoute` component
3. Specify `requiredRoles` if needed

Example:
```jsx
<Route
  path="/new-route"
  element={
    <ProtectedRoute requireAuth={true} requiredRoles={ROLES.ADMIN}>
      <NewComponent />
    </ProtectedRoute>
  }
/>
```

## Troubleshooting

### API Connection Issues
- Verify backend is running on `http://localhost:5000`
- Check CORS settings on backend
- Verify API endpoints match backend routes

### Authentication Issues
- Check localStorage for `token` and `refreshToken`
- Verify token format matches backend expectations
- Check browser console for API errors

### Redux State Issues
- Use Redux DevTools browser extension
- Check action payloads in console
- Verify slice reducers are handling actions correctly

## Next Steps

1. **Member 4**: Start building UI components and authentication pages
2. **Member 5**: Start building page components using the Redux hooks and services
3. **Integration**: Test all components with the backend API
4. **Styling**: Add CSS/styling framework (Tailwind, Material-UI, etc.)

## Support

Refer to `ARCHITECTURE.md` for detailed documentation on:
- Redux usage patterns
- API service examples
- Route protection examples
- Role-based access control

