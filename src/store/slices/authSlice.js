
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock user data - in a real app this would come from an API
const users = [
  {
    email: 'jane@example.com',
    name: 'Jane Doe',
    roles: ['hr', 'manager'],
    id: '1',
    avatar: '/placeholder.svg',
  },
  {
    email: 'john@example.com',
    name: 'John Smith',
    roles: ['manager', 'employee'],
    id: '2',
    avatar: '/placeholder.svg',
  },
  {
    email: 'alex@example.com',
    name: 'Alex Johnson',
    roles: ['employee'],
    id: '3',
    avatar: '/placeholder.svg',
  },
  {
    email: 'sarah@example.com',
    name: 'Sarah Williams',
    roles: ['hr', 'manager', 'employee'],
    id: '4',
    avatar: '/placeholder.svg',
  },
];

// Create async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        return rejectWithValue('User not found');
      }
      
      // In a real app, password validation would happen here
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
