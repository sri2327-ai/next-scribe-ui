import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to the main app on any login attempt
    navigate('/');
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
          <h2 className="text-2xl font-bold mb-2 text-black">Doctor Sign In</h2>
          <p className="text-gray-500 mb-6">Enter your email and password</p>
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
            className="w-full bg-[#33C3F0] text-white hover:bg-[#1EAEDB]"
          >
            Sign In
          </Button>
        </form>
        <div className="flex flex-row mt-4 justify-between">
          <Link to="/forgot-password" className="text-xs font-medium text-[#1EAEDB] hover:underline">
            Forgot password?
          </Link>
          <Link to="/signup" className="text-xs ml-2 font-medium text-[#1EAEDB] hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
