
import { createSlice } from '@reduxjs/toolkit';
import { logout } from './authSlice';

const initialState = {
  currentRole: null,
  availableRoles: [],
  isRoleSwitching: false,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setCurrentRole: (state, action) => {
      state.currentRole = action.payload;
    },
    setAvailableRoles: (state, action) => {
      state.availableRoles = action.payload;
    },
    startRoleSwitching: (state) => {
      state.isRoleSwitching = true;
    },
    endRoleSwitching: (state) => {
      state.isRoleSwitching = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.currentRole = null;
      state.availableRoles = [];
      state.isRoleSwitching = false;
    });
  },
});

export const { 
  setCurrentRole, 
  setAvailableRoles, 
  startRoleSwitching, 
  endRoleSwitching 
} = roleSlice.actions;

export default roleSlice.reducer;
