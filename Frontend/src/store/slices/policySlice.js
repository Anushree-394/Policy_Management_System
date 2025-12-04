import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { policyService } from '../../services/policyService';

/**
 * Policy Slice
 * Manages policy-related state and operations
 */

// Initial state
const initialState = {
  policies: [],
  currentPolicy: null,
  isLoading: false,
  error: null,
  filters: {
    category: null,
    searchQuery: '',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

// Async thunks for API calls
export const fetchPolicies = createAsyncThunk(
  'policy/fetchPolicies',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await policyService.getAllPolicies(params);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch policies'
      );
    }
  }
);

export const fetchPolicyById = createAsyncThunk(
  'policy/fetchPolicyById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await policyService.getPolicyById(id);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch policy'
      );
    }
  }
);

export const createPolicy = createAsyncThunk(
  'policy/createPolicy',
  async (policyData, { rejectWithValue }) => {
    try {
      const response = await policyService.createPolicy(policyData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create policy'
      );
    }
  }
);

export const updatePolicy = createAsyncThunk(
  'policy/updatePolicy',
  async ({ id, policyData }, { rejectWithValue }) => {
    try {
      const response = await policyService.updatePolicy(id, policyData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update policy'
      );
    }
  }
);

export const deletePolicy = createAsyncThunk(
  'policy/deletePolicy',
  async (id, { rejectWithValue }) => {
    try {
      await policyService.deletePolicy(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete policy'
      );
    }
  }
);

export const searchPolicies = createAsyncThunk(
  'policy/searchPolicies',
  async (query, { rejectWithValue }) => {
    try {
      const response = await policyService.searchPolicies(query);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to search policies'
      );
    }
  }
);

// Policy slice
const policySlice = createSlice({
  name: 'policy',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPolicy: (state) => {
      state.currentPolicy = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: null,
        searchQuery: '',
      };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    // Fetch policies
    builder
      .addCase(fetchPolicies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPolicies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.policies = action.payload.policies || action.payload.data || action.payload;
        if (action.payload.pagination) {
          state.pagination = { ...state.pagination, ...action.payload.pagination };
        }
        state.error = null;
      })
      .addCase(fetchPolicies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Fetch policy by ID
    builder
      .addCase(fetchPolicyById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPolicyById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPolicy = action.payload.policy || action.payload;
        state.error = null;
      })
      .addCase(fetchPolicyById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Create policy
    builder
      .addCase(createPolicy.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPolicy.fulfilled, (state, action) => {
        state.isLoading = false;
        const newPolicy = action.payload.policy || action.payload;
        state.policies.unshift(newPolicy);
        state.error = null;
      })
      .addCase(createPolicy.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Update policy
    builder
      .addCase(updatePolicy.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePolicy.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedPolicy = action.payload.policy || action.payload;
        const index = state.policies.findIndex((p) => p.id === updatedPolicy.id);
        if (index !== -1) {
          state.policies[index] = updatedPolicy;
        }
        if (state.currentPolicy?.id === updatedPolicy.id) {
          state.currentPolicy = updatedPolicy;
        }
        state.error = null;
      })
      .addCase(updatePolicy.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Delete policy
    builder
      .addCase(deletePolicy.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePolicy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.policies = state.policies.filter((p) => p.id !== action.payload);
        if (state.currentPolicy?.id === action.payload) {
          state.currentPolicy = null;
        }
        state.error = null;
      })
      .addCase(deletePolicy.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Search policies
    builder
      .addCase(searchPolicies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchPolicies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.policies = action.payload.policies || action.payload.data || action.payload;
        state.error = null;
      })
      .addCase(searchPolicies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearCurrentPolicy,
  setFilters,
  clearFilters,
  setPagination,
} = policySlice.actions;
export default policySlice.reducer;

