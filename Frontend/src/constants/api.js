/**
 * API Constants
 * Centralized API endpoint definitions
 */

export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  
  // Policy endpoints
  POLICIES: {
    BASE: '/policies',
    BY_ID: (id) => `/policies/${id}`,
    BY_CATEGORY: (category) => `/policies/category/${category}`,
    SEARCH: '/policies/search',
  },
  
  // User endpoints (if needed)
  USERS: {
    BASE: '/users',
    BY_ID: (id) => `/users/${id}`,
  },
};

export const API_BASE_URL = 'http://localhost:5000/api';

