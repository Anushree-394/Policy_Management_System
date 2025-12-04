import { createSlice } from '@reduxjs/toolkit';
import { fileClaim, fetchUserClaims } from './claimsThunks';

const initialState = {
  claims: [],
  fileLoading: false,
  fetchLoading: false,
  error: null,
};

const claimsSlice = createSlice({
  name: 'claims',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // File claim
      .addCase(fileClaim.pending, (state) => {
        state.fileLoading = true;
        state.error = null;
      })
      .addCase(fileClaim.fulfilled, (state, action) => {
        state.fileLoading = false;
        const newClaim = action.payload?.claim || action.payload;
        if (newClaim) {
          state.claims = [newClaim, ...state.claims];
        }
        state.error = null;
      })
      .addCase(fileClaim.rejected, (state, action) => {
        state.fileLoading = false;
        state.error = action.payload;
      })
      // Fetch user claims
      .addCase(fetchUserClaims.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchUserClaims.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.claims = action.payload?.claims || action.payload || [];
        state.error = null;
      })
      .addCase(fetchUserClaims.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = claimsSlice.actions;
export default claimsSlice.reducer;

