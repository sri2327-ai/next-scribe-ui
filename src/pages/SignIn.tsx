
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#F1F0FB] to-[#9b87f5]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10">
        <div className="flex flex-col items-center">
          <User className="h-12 w-12 text-purple-500 mb-2" />
          <h2 className="text-2xl font-bold mb-2 text-dark-charcoal">Doctor Sign In</h2>
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
          <Button type="submit" className="w-full bg-[#9b87f5] text-white hover:bg-[#7E69AB]">
            Sign In
          </Button>
        </form>
        <div className="flex flex-row mt-4 justify-between">
          <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline text-[#7E69AB]">
            Forgot password?
          </Link>
          <Link to="/signup" className="text-xs ml-2 font-medium text-[#7E69AB] hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
