
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/doctor/dashboard');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">S10.AI Healthcare Portal</h1>
        <p className="text-gray-600">Redirecting to dashboard...</p>
        <img 
          src="/lovable-uploads/20cdf9a7-452f-4cd4-b1d0-5030d6b36ad9.png" 
          alt="S10.AI Logo" 
          className="w-32 h-auto mx-auto mt-4"
        />
      </div>
    </div>
  );
}
