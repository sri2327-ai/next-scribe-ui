
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Osmind</h3>
            <p className="text-sm text-gray-300">
              Empowering mental health professionals with innovative tools
              for better patient care and practice management.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="/technology" className="hover:text-white">Technology</a></li>
              <li><a href="/patient" className="hover:text-white">Patient Portal</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: support@osmind.com</li>
              <li>Phone: (123) 456-7890</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700 text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} Osmind. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
