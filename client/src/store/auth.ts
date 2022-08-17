import { createSlice, SerializedError, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export enum AuthStates {
  IDLE = 'idle',
  LOADING = 'loading',
}

export interface AuthSliceState {
  accessToken: string;
  loading: AuthStates;
  error?: SerializedError | null;
}

const internalInitialState = {
  accessToken: '',
  loading: AuthStates.IDLE,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth', 
  initialState: internalInitialState,
  reducers: {
    updateAccessToken(
      state: AuthSliceState,
      action: PayloadAction<{ token: string }>
    ) {
      state.accessToken = action.payload.token;
    },
    logout: () => internalInitialState,
  },
  extraReducers: (builder) => {}, 
});

export const selectToken = (state: RootState) => state.auth.accessToken;

export const { updateAccessToken, logout } = authSlice.actions;
