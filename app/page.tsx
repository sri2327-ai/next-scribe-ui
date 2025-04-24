
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex flex-col items-center">
          <img 
            src="/lovable-uploads/20cdf9a7-452f-4cd4-b1d0-5030d6b36ad9.png" 
            alt="S10.AI" 
            className="mb-4 w-32 h-auto"
          />
          <h2 className="text-2xl font-bold mb-2 text-black">Welcome to S10.AI</h2>
          <p className="text-gray-500 mb-6">Choose your portal</p>
        </div>
        <div className="space-y-4">
          <Link href="/doctor/signin" className="block">
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
              Doctor Portal
            </Button>
          </Link>
          <Link href="/patient/signin" className="block">
            <Button variant="outline" className="w-full">
              Patient Portal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
