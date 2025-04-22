
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#F1F0FB] to-[#9b87f5]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2 text-dark-charcoal">Forgot Password</h2>
          <p className="text-gray-500 mb-6 text-center">Enter your email address to receive password reset instructions.</p>
        </div>
        <form className="flex flex-col gap-4">
          <Input type="email" placeholder="Email" required />
          <Button type="submit" className="w-full bg-[#9b87f5] text-white hover:bg-[#7E69AB]">Send Reset Link</Button>
        </form>
        <div className="flex mt-4 justify-center">
          <Link to="/signin" className="text-xs text-[#7E69AB] hover:underline font-medium">Back to sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
