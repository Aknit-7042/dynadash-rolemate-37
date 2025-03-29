
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="max-w-3xl text-center space-y-6 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          DynaDash
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A seamless multi-role dashboard experience that adapts to your organizational responsibilities
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button 
            size="lg" 
            onClick={() => router.push('/login')}
            className="text-lg px-8"
          >
            Sign In
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => router.push('/login')}
            className="text-lg px-8"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
