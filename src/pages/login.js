
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">DynaDash</h1>
        <p className="text-lg text-muted-foreground">Multi-role enterprise dashboard</p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
