
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logout, clearError } from '@/store/slices/authSlice';

export const useReduxAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading, error } = useSelector((state) => state.auth);

  const login = async (email, password) => {
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      return !resultAction.error;
    } catch (err) {
      return false;
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout: logoutUser,
    clearError: clearAuthError,
  };
};
