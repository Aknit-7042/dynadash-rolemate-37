
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { RoleProvider } from '@/context/RoleContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // If still loading, show a loading state
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-56 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-36 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <RoleProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <Navbar />
          <div className="flex-1 overflow-auto bg-muted/30">
            <div className="container py-6 max-w-7xl">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </RoleProvider>
  );
};

export default MainLayout;
