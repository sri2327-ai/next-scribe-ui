"use client";

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold">AI Scribe</h2>
            <p className="text-gray-400 mt-2">Transforming text into understanding</p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-purple-400 transition-colors">About</Link>
            <Link href="/technology" className="hover:text-purple-400 transition-colors">Technology</Link>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} AI Scribe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
