import React from 'react';
import { X, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-6 mt-[3rem]" >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* Left side - Logo and Links */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <img src={'/logo.svg'} className='w-[150px] h-[50px]' />
            <div className="flex flex-wrap items-center justify-center md:justify-start space-x-6">
              <a 
                href="#about" 
                className="text-gray-700 hover:text-gray-700 transition-colors duration-200 text-sm font-medium"
              >
                About
              </a>
              <a 
                href="#privacy" 
                className="text-gray-700 hover:text-gray-700 transition-colors duration-200 text-sm font-medium"
              >
                Privacy Policy
              </a>
              <a 
                href="#terms" 
                className="text-gray-700 hover:text-gray-700 transition-colors duration-200 text-sm font-medium"
              >
                Terms and Conditions
              </a>
            </div>
          </div>
          
          {/* Right side - Social Icons and Copyright */}
          <div className="flex flex-col items-center space-y-6">
            {/* Social Icons */}
            <div className="flex items-center space-x-3">
              <a 
                href="#" 
                className="text-black hover:text-gray-700 transition-colors duration-200"
                aria-label="Twitter"
              >
                <X size={20} />
              </a>
              <a 
                href="#" 
                className="text-black hover:text-gray-700 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-black hover:text-gray-700 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
            
            {/* Copyright */}
            <div className="text-sm text-black">
              @2025 loopp, Inc.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;