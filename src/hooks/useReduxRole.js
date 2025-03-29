
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setCurrentRole, 
  setAvailableRoles, 
  startRoleSwitching,
  endRoleSwitching
} from '@/store/slices/roleSlice';

export const useReduxRole = () => {
  const dispatch = useDispatch();
  const { currentRole, availableRoles, isRoleSwitching } = useSelector((state) => state.role || {});
  const { user } = useSelector((state) => state.auth || {});

  useEffect(() => {
    if (user && user.roles) {
      dispatch(setAvailableRoles(user.roles));
      
      // If we don't have a current role yet, set the first available role
      if (!currentRole && user.roles.length > 0) {
        dispatch(setCurrentRole(user.roles[0]));
      }
    }
  }, [user, currentRole, dispatch]);

  const switchRole = async (newRole) => {
    if (newRole === currentRole) return;
    
    dispatch(startRoleSwitching());
    
    // Simulate role switching delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    dispatch(setCurrentRole(newRole));
    dispatch(endRoleSwitching());
  };

  // Add role color getter
  const roleColor = (() => {
    switch (currentRole) {
      case 'hr':
        return 'bg-hr text-hr-foreground';
      case 'manager':
        return 'bg-manager text-manager-foreground';
      case 'employee':
        return 'bg-employee text-employee-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  })();

  return {
    currentRole,
    availableRoles,
    isRoleSwitching,
    switchRole,
    roleColor,
  };
};
