
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/20">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-medium">Page Not Found</h2>
        <p className="text-muted-foreground">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="pt-4">
          <Button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
