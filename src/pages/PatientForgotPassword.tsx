
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const PatientForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    // In a real app, this would connect to your backend to send a reset email
    setSubmitted(true);
    toast.success("Password reset instructions sent to your email");
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
          <h2 className="text-2xl font-bold mb-2 text-black">Forgot Password</h2>
          <p className="text-gray-500 mb-6 text-center">Enter your email address to receive password reset instructions.</p>
        </div>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input 
              type="email" 
              placeholder="Email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              type="submit" 
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Send Reset Link
            </Button>
          </form>
        ) : (
          <div className="text-center p-4 bg-blue-50 rounded-lg mb-4">
            Check your email for the password reset link
          </div>
        )}
        
        <div className="flex mt-4 justify-center">
          <Link to="/patient/signin" className="text-xs text-[#1EAEDB] hover:underline font-medium">
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PatientForgotPassword;
