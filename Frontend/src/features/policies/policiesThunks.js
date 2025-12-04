import { createAsyncThunk } from '@reduxjs/toolkit';
import policiesAPI from '../../services/api/policiesAPI';

/**
 * Policies Thunks
 * Handles async policy-related operations
 */

/** Fetch all policies */
export const fetchPolicies = createAsyncThunk(
  'policies/fetchPolicies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await policiesAPI.fetchPolicies();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch policies'
      );
    }
  }
);

/** Purchase/Create policy */
export const purchasePolicy = createAsyncThunk(
  'policies/purchasePolicy',
  async (policyData, { rejectWithValue }) => {
    try {
      const response = await policiesAPI.createPolicy(policyData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to purchase policy'
      );
    }
  }
);

/** Fetch products */
export const fetchProducts = createAsyncThunk(
  'policies/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await policiesAPI.getProducts();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch products'
      );
    }
  }
);

/** Calculate premium */
export const calculatePremiumValue = createAsyncThunk(
  'policies/calculatePremiumValue',
  async (calculationData, { rejectWithValue }) => {
    try {
      const response = await policiesAPI.calculatePremium(calculationData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to calculate premium'
      );
    }
  }
);

