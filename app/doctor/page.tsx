
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DoctorRoot() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/doctor/dashboard');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Redirecting...</h1>
        <p className="text-gray-600">Please wait while we redirect you to the dashboard.</p>
      </div>
    </div>
  );
}
