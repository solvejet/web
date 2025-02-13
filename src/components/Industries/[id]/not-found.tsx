// src/app/industries/[id]/not-found.tsx
import { ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function IndustryNotFound() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Industry Not Found</h1>
        <p className="mt-4 text-muted-foreground">
          The industry you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Button href="/industries" variant="outline" icon={<ArrowLeft className="h-4 w-4" />}>
            Back to Industries
          </Button>
        </div>
      </div>
    </div>
  );
}
