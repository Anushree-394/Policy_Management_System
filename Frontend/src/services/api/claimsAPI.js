import axiosInstance from '../axios';

/**
 * Claims API
 * Handles all claim-related API calls
 */
const claimsAPI = {
  /**
   * File a new claim
   * @param {Object} claimData - Claim data
   * @returns {Promise} Response data
   */
  fileClaim: async (claimData) => {
    const response = await axiosInstance.post('/claims', claimData);
    return response.data;
  },

  /**
   * Get current user's claims
   * @returns {Promise} Response data
   */
  getUserClaims: async () => {
    const response = await axiosInstance.get('/claims/my');
    return response.data;
  },

  /**
   * Get claim by ID
   * @param {string|number} id - Claim ID
   * @returns {Promise} Response data
   */
  getClaimById: async (id) => {
    const response = await axiosInstance.get(`/claims/${id}`);
    return response.data;
  },
};

export default claimsAPI;

