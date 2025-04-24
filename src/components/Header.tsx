
import React from 'react';
import { Bell, Settings, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-purple-600">osmind</h1>
          <nav className="ml-8 hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="/" className="text-gray-700 hover:text-blue-600">Home</a></li>
              <li><a href="/about" className="text-gray-700 hover:text-blue-600">About</a></li>
              <li><a href="/technology" className="text-gray-700 hover:text-blue-600">Technology</a></li>
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          <button className="flex items-center space-x-2 p-1 rounded hover:bg-gray-100">
            <div className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <span className="hidden md:inline text-sm font-medium">Dr. Thompson</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
