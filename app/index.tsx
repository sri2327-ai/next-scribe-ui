
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/doctor/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <img 
          src="/lovable-uploads/20cdf9a7-452f-4cd4-b1d0-5030d6b36ad9.png" 
          alt="S10.AI" 
          className="w-32 h-auto mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">Loading...</h1>
      </div>
    </div>
  );
}
