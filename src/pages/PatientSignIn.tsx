
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, User, Lock } from "lucide-react";

const PatientSignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication - in a real app, this would connect to your backend
    setTimeout(() => {
      if (email && password) {
        // Store auth state in local storage (just for demo purposes)
        localStorage.setItem("patientAuth", "true");
        localStorage.setItem("patientEmail", email);
        
        toast.success("Signed in successfully");
        navigate("/patient");
      } else {
        toast.error("Please enter both email and password");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-background to-muted/50">
      <div className="w-full max-w-md px-4">
        <Card className="shadow-soft border-none animate-entrance">
          <CardHeader className="space-y-4 pb-2">
            <div className="flex flex-col items-center">
              <div className="w-32 h-auto mb-4">
                <img 
                  src="/lovable-uploads/20cdf9a7-452f-4cd4-b1d0-5030d6b36ad9.png" 
                  alt="S10.AI" 
                  className="w-full"
                />
              </div>
              <CardTitle className="text-2xl text-center">Patient Portal</CardTitle>
              <CardDescription className="text-center text-base">Access your healthcare information</CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form onSubmit={handleSignIn} className="space-y-5">
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute left-3 top-3 text-muted-foreground">
                    <User size={16} />
                  </div>
                  <Input 
                    type="email" 
                    placeholder="Email address" 
                    className="pl-9 bg-muted/30"
                    required 
                    autoFocus 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute left-3 top-3 text-muted-foreground">
                    <Lock size={16} />
                  </div>
                  <Input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="pl-9 pr-10 bg-muted/30"
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 border-t pt-6">
            <div className="w-full flex justify-center">
              <Link to="/patient/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm text-muted-foreground">Don't have an account?</span>
              <Link to="/patient/signup" className="text-sm font-medium text-primary hover:underline">
                Create an account
              </Link>
            </div>
          </CardFooter>
        </Card>
        
        <div className="text-center text-muted-foreground text-xs mt-8">
          &copy; {new Date().getFullYear()} S10.AI. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default PatientSignIn;
