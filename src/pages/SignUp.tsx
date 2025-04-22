
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#F1F0FB] to-[#9b87f5]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10">
        <div className="flex flex-col items-center">
          <User className="h-12 w-12 text-purple-500 mb-2" />
          <h2 className="text-2xl font-bold mb-2 text-dark-charcoal">Doctor Sign Up</h2>
          <p className="text-gray-500 mb-6">Create your doctor account</p>
        </div>
        <form className="flex flex-col gap-4">
          <Input type="text" placeholder="Full name" required />
          <Input type="email" placeholder="Email" required />
          <Input type="password" placeholder="Password" required />
          <Button type="submit" className="w-full bg-[#9b87f5] text-white hover:bg-[#7E69AB]">Sign Up</Button>
        </form>
        <div className="flex mt-4 justify-center">
          <span className="text-xs text-gray-500">Already have an account?</span>
          <Link to="/signin" className="ml-2 text-xs text-[#7E69AB] hover:underline font-medium">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
