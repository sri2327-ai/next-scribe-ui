
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10">
        <div className="flex flex-col items-center">
          <img 
            src="/lovable-uploads/20cdf9a7-452f-4cd4-b1d0-5030d6b36ad9.png" 
            alt="S10.AI" 
            className="mb-4 w-32 h-auto"
          />
          <h2 className="text-2xl font-bold mb-2 text-black">Doctor Sign Up</h2>
          <p className="text-gray-500 mb-6">Create your doctor account</p>
        </div>
        <form className="flex flex-col gap-4">
          <Input type="text" placeholder="Full name" required />
          <Input type="email" placeholder="Email" required />
          <Input type="password" placeholder="Password" required />
          <Button type="submit" className="w-full bg-[#1EAEDB] text-white hover:bg-[#0FA0CE]">
            Sign Up
          </Button>
        </form>
        <div className="flex mt-4 justify-center">
          <span className="text-xs text-gray-500">Already have an account?</span>
          <Link to="/signin" className="ml-2 text-xs text-[#1EAEDB] hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
