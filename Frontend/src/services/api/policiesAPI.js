import axiosInstance from '../axios';

/**
 * Policies API
 * Handles all policy-related API calls
 */
const policiesAPI = {
  /**
   * Fetch all policies
   * @returns {Promise} Response data
   */
  fetchPolicies: async () => {
    const response = await axiosInstance.get('/policies');
    return response.data;
  },

  /**
   * Get policy by ID
   * @param {string|number} id - Policy ID
   * @returns {Promise} Response data
   */
  getPolicyById: async (id) => {
    const response = await axiosInstance.get(`/policies/${id}`);
    return response.data;
  },

  /**
   * Create new policy
   * @param {Object} policyData - Policy data
   * @returns {Promise} Response data
   */
  createPolicy: async (policyData) => {
    const response = await axiosInstance.post('/policies', policyData);
    return response.data;
  },

  /**
   * Get all products
   * @returns {Promise} Response data
   */
  getProducts: async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
  },

  /**
   * Calculate premium
   * @param {Object} calculationData - Premium calculation data
   * @returns {Promise} Response data
   */
  calculatePremium: async (calculationData) => {
    const response = await axiosInstance.post('/premium/calculate', calculationData);
    return response.data;
  },
};

export default policiesAPI;

