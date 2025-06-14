import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isTopServicesOpen, setIsTopServicesOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show search bar when scrolled down 100px or more
      setShowSearch(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white ">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-black">
              <img src={'/logo.svg'} className='w-[100px] h-[40px]' alt="Logo" />
            </a>
          </div>

          {/* Navigation Links and Search */}
          <div className="hidden md:flex items-center">
            {/* Search Bar - appears on scroll */}
            <div className={`transition-all duration-300 ease-in-out mr-6 ${
              showSearch ? 'opacity-100 w-80' : 'opacity-0 w-0'
            } overflow-hidden`}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-baseline space-x-8">
              {/* Top Services Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsTopServicesOpen(true)}
                onMouseLeave={() => setIsTopServicesOpen(false)}
              >
                <button className="flex items-center text-black hover:text-gray-700 px-3 py-3 text-sm font-bold transition-colors duration-200">
                  Top Services
                  <ChevronDown 
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      isTopServicesOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                <div className={`absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 transition-all duration-200 ${
                  isTopServicesOpen 
                    ? 'opacity-100 visible transform translate-y-0' 
                    : 'opacity-0 invisible transform -translate-y-2'
                }`}>
                  <div className="py-1">
                    <a href="/services/web-development" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                      Web Development
                    </a>
                    <a href="/services/mobile-apps" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                      Mobile Apps
                    </a>
                    <a href="/services/ai-solutions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                      AI Solutions
                    </a>
                    <a href="/services/consulting" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                      Consulting
                    </a>
                  </div>
                </div>
              </div>

              {/* Explore Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsExploreOpen(true)}
                onMouseLeave={() => setIsExploreOpen(false)}
              >
                <button className="flex items-center text-black hover:text-gray-700 px-3 py-3 text-sm font-bold transition-colors duration-200">
                  Explore
                  <ChevronDown 
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      isExploreOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                <div className={`absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 transition-all duration-200 ${
                  isExploreOpen 
                    ? 'opacity-100 visible transform translate-y-0' 
                    : 'opacity-0 invisible transform -translate-y-2'
                }`}>
                  <div className="py-1">
                    <a href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                      About
                    </a>
                    <a href="/career" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                      Career
                    </a>
                    <a href="/explore/resources" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                      Resources
                    </a>
                  </div>
                </div>
              </div>

              {/* Become a Partner */}
              <a
                href="/partner"
                className="text-black hover:text-gray-700 px-3 py-3 text-sm font-bold transition-colors duration-200"
              >
                Become a Partner
              </a>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-3">
              <a
                href="/get-hired"
                className="border border-gray-300 text-black hover:bg-gray-50 px-6 py-3 rounded-full text-sm font-bold transition-colors duration-200"
              >
                Get Hired
              </a>
              <a
                href="/hire-an-engineer"
                className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-full text-sm font-bold transition-colors duration-200"
              >
                Hire AI Engineer
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          <a href="/services" className="text-gray-700 hover:text-black block px-3 py-2 text-base font-medium">
            Top Services
          </a>
          <a href="/explore" className="text-gray-700 hover:text-black block px-3 py-2 text-base font-medium">
            Explore
          </a>
          <a href="/partner" className="text-gray-700 hover:text-black block px-3 py-2 text-base font-medium">
            Become a Partner
          </a>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="space-y-2">
              <a href="/get-hired" className="block text-center border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-full text-sm font-medium">
                Get Hired
              </a>
              <a href="/hire-an-engineer" className="block text-center bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-full text-sm font-medium">
                Hire AI Engineer
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;