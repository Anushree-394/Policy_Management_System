import { createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from '../../services/api/authAPI';

/**
 * Async Thunks for Authentication
 * Handles async API calls for login and registration
 */

/**
 * Login user async thunk
 * @param {Object} credentials - {email, password}
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(email, password);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Login failed'
      );
    }
  }
);

/**
 * Register user async thunk
 * @param {Object} userData - User registration data
 */
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Registration failed'
      );
    }
  }
);

