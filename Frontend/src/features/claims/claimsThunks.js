import { createAsyncThunk } from '@reduxjs/toolkit';
import claimsAPI from '../../services/api/claimsAPI';

/**
 * Claims Thunks
 * Handles async claim operations
 */

/** File a claim */
export const fileClaim = createAsyncThunk(
  'claims/fileClaim',
  async (claimData, { rejectWithValue }) => {
    try {
      const response = await claimsAPI.fileClaim(claimData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to file claim'
      );
    }
  }
);

/** Fetch current user's claims */
export const fetchUserClaims = createAsyncThunk(
  'claims/fetchUserClaims',
  async (_, { rejectWithValue }) => {
    try {
      const response = await claimsAPI.getUserClaims();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch claims'
      );
    }
  }
);

