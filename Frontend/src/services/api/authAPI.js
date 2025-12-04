import axiosInstance from '../axios';

/**
 * Authentication API
 * Handles all authentication-related API calls
 */
const authAPI = {
  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} Response data
   */
  login: async (email, password) => {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise} Response data
   */
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  },

  /**
   * Verify JWT token
   * @returns {Promise} Response data
   */
  verifyToken: async () => {
    const response = await axiosInstance.get('/auth/verify');
    return response.data;
  },
};

export default authAPI;

