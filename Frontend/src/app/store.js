import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import policiesReducer from '../features/policies/policiesSlice';
import claimsReducer from '../features/claims/claimsSlice';

/**
 * Redux Store Configuration
 * Centralized state management for the application
 */
const store = configureStore({
  reducer: {
    auth: authReducer,
    policies: policiesReducer,
    claims: claimsReducer,
  },
});

export default store;

