
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function PatientSignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const router = useRouter();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!fullName || !email || !password || !inviteCode) {
      toast.error("Please fill out all fields");
      return;
    }
    
    // In a real app, you would validate the invite code against your backend
    if (inviteCode !== "DEMO123") { // Just for demonstration
      toast.error("Invalid invite code");
      return;
    }
    
    // Simulate successful signup
    toast.success("Account created successfully!");
    router.push("/patient/signin");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10">
        <div className="flex flex-col items-center">
          <img 
            src="/lovable-uploads/20cdf9a7-452f-4cd4-b1d0-5030d6b36ad9.png" 
            alt="S10.AI" 
            className="mb-4 w-32 h-auto"
          />
          <h2 className="text-2xl font-bold mb-2 text-black">Patient Sign Up</h2>
          <p className="text-gray-500 mb-6">Create your patient account</p>
        </div>
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <Input 
            type="text" 
            placeholder="Full name" 
            required 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input 
            type="email" 
            placeholder="Email" 
            required 
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
          <Input 
            type="text" 
            placeholder="Invite code from your doctor" 
            required 
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
          />
          <Button 
            type="submit" 
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Sign Up
          </Button>
        </form>
        <div className="flex mt-4 justify-center">
          <span className="text-xs text-gray-500">Already have an account?</span>
          <Link href="/patient/signin" className="ml-2 text-xs text-[#1EAEDB] hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
