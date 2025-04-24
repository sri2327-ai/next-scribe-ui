
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function PatientSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      localStorage.setItem("patientAuth", "true");
      localStorage.setItem("patientEmail", email);
      
      toast.success("Signed in successfully");
      router.push('/patient/dashboard');
    } else {
      toast.error("Please enter both email and password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10">
        <div className="flex flex-col items-center mb-6">
          <img 
            src="/lovable-uploads/20cdf9a7-452f-4cd4-b1d0-5030d6b36ad9.png" 
            alt="S10.AI" 
            className="mb-4 w-32 h-auto"
          />
          <h2 className="text-2xl font-bold mb-2 text-black">Patient Sign In</h2>
          <p className="text-gray-500 mb-6">Access your healthcare portal</p>
        </div>
        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <Input 
            type="email" 
            placeholder="Email" 
            required 
            autoFocus 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            type="password" 
            placeholder="Password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            type="submit" 
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Sign In
          </Button>
        </form>
        <div className="flex flex-row mt-4 justify-between">
          <Link href="/patient/forgot-password" className="text-xs font-medium text-[#1EAEDB] hover:underline">
            Forgot password?
          </Link>
          <Link href="/patient/signup" className="text-xs ml-2 font-medium text-[#1EAEDB] hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
