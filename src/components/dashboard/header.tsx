// src/components/Header.tsx
import React from 'react';
import { Menu, Search, Bell, Calendar } from 'lucide-react';

interface HeaderProps {
  onBurgerClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBurgerClick }) => (
  <header className="fixed top-0 left-0 lg:left-64 right-0 bg-white border-b border-gray-200 px-4 py-4 lg:px-8 z-30">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button onClick={onBurgerClick} className="p-2 rounded-md hover:bg-gray-100 lg:hidden">
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent w-64"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-lg hover:bg-gray-100 relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Calendar className="w-5 h-5 text-gray-600" />
        </button>
        <div className="w-8 h-8 bg-gradient-to-r from-black to-gray-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">JD</span>
        </div>
      </div>
    </div>
  </header>
);

export default Header;