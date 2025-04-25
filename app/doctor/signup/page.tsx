
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DoctorSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you'd register the user in your backend
      // For now we're simulating registration
      setTimeout(() => {
        toast.success("Account created successfully");
        router.push('/doctor/signin');
      }, 1500);
    } catch (error) {
      toast.error("Registration failed");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="flex flex-col items-center pb-2 pt-6">
          <img 
            src="/lovable-uploads/20cdf9a7-452f-4cd4-b1d0-5030d6b36ad9.png" 
            alt="S10.AI" 
            className="mb-4 w-32 h-auto"
          />
          <h2 className="text-2xl font-bold mb-2 text-black">Create Doctor Account</h2>
          <p className="text-gray-500">Sign up to access the doctor portal</p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <Input 
              type="text" 
              placeholder="Full Name" 
              required 
              autoFocus 
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
              type="password" 
              placeholder="Confirm Password" 
              required 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button 
              type="submit" 
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">Already have an account?</span>{" "}
            <Link href="/doctor/signin" className="text-sm font-medium text-[#1EAEDB] hover:underline">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
