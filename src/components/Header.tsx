
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  ChevronRight,
  Home,
  Info,
  Cpu
} from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-white text-2xl font-bold">AI Scribe</h1>
        </div>
        
        <nav className="flex space-x-2">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <Info className="mr-2 h-4 w-4" />
              About
            </Button>
          </Link>
          <Link to="/technology">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <Cpu className="mr-2 h-4 w-4" />
              Technology
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
