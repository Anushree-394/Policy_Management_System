import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPolicies,
  purchasePolicy,
  fetchProducts,
  calculatePremiumValue,
} from './policiesThunks';

const initialState = {
  policies: [],
  products: [],
  selectedPolicy: null,
  purchaseLoading: false,
  fetchLoading: false,
  calculatedPremium: null,
  error: null,
};

const policiesSlice = createSlice({
  name: 'policies',
  initialState,
  reducers: {
    setSelectedPolicy: (state, action) => {
      state.selectedPolicy = action.payload;
    },
    clearSelectedPolicy: (state) => {
      state.selectedPolicy = null;
    },
    clearCalculatedPremium: (state) => {
      state.calculatedPremium = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch policies
      .addCase(fetchPolicies.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchPolicies.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.policies = action.payload?.policies || action.payload || [];
        state.error = null;
      })
      .addCase(fetchPolicies.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.payload;
      })
      // Purchase policy
      .addCase(purchasePolicy.pending, (state) => {
        state.purchaseLoading = true;
        state.error = null;
      })
      .addCase(purchasePolicy.fulfilled, (state, action) => {
        state.purchaseLoading = false;
        const newPolicy = action.payload?.policy || action.payload;
        if (newPolicy) {
          state.policies = [newPolicy, ...state.policies];
          state.selectedPolicy = newPolicy;
        }
        state.error = null;
      })
      .addCase(purchasePolicy.rejected, (state, action) => {
        state.purchaseLoading = false;
        state.error = action.payload;
      })
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.products = action.payload?.products || action.payload || [];
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.payload;
      })
      // Calculate premium
      .addCase(calculatePremiumValue.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(calculatePremiumValue.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.calculatedPremium = action.payload?.premium || action.payload;
        state.error = null;
      })
      .addCase(calculatePremiumValue.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedPolicy,
  clearSelectedPolicy,
  clearCalculatedPremium,
  clearError,
} = policiesSlice.actions;

export default policiesSlice.reducer;

