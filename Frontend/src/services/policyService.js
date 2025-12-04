import api from './api';

/**
 * Policy Service
 * Handles all policy-related API calls
 */

export const policyService = {
  // Get all policies
  getAllPolicies: async (params = {}) => {
    const response = await api.get('/policies', { params });
    return response.data;
  },

  // Get policy by ID
  getPolicyById: async (id) => {
    const response = await api.get(`/policies/${id}`);
    return response.data;
  },

  // Create new policy
  createPolicy: async (policyData) => {
    const response = await api.post('/policies', policyData);
    return response.data;
  },

  // Update policy
  updatePolicy: async (id, policyData) => {
    const response = await api.put(`/policies/${id}`, policyData);
    return response.data;
  },

  // Delete policy
  deletePolicy: async (id) => {
    const response = await api.delete(`/policies/${id}`);
    return response.data;
  },

  // Get policies by category
  getPoliciesByCategory: async (category) => {
    const response = await api.get(`/policies/category/${category}`);
    return response.data;
  },

  // Search policies
  searchPolicies: async (query) => {
    const response = await api.get('/policies/search', { params: { q: query } });
    return response.data;
  },
};

