import React, { useState, useRef, useEffect } from 'react';
import { Bell, MessageCircle } from 'lucide-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

interface UserAvatarDropdownProps {
  userName?: string;
  userInitials?: string;
  showUpgradeBanner?: boolean;
}

const UserAvatarDropdown: React.FC<UserAvatarDropdownProps> = ({
  userName = "Victor Ehimigbai",
  userInitials = "V",
  showUpgradeBanner = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter()

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const logOutUser = () => {
      Cookies.remove('authToken')
      router.reload()
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative inline-block">
      {/* Header with icons */}
      <div className="flex items-center space-x-4">
        {showUpgradeBanner && (
          <button className="bg-gray-900 text-white hidden px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
            Upgrade to Pro
          </button>
        )}
        
        <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <MessageCircle size={20} />
        </button>
        
        <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <Bell size={20} />
        </button>
        
        {/* Avatar */}
        <div
          ref={dropdownRef}
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={handleClick}
            className="w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center font-semibold hover:bg-teal-600 transition-colors relative"
          >
            {userInitials}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </button>
          
          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              {/* User Info Section */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center font-semibold relative">
                    {userInitials}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{userName}</div>
                  </div>
                </div>
              </div>
              
              {/* Menu Items */}
              <div className="py-2">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Projects Overview
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Settings
                </button>
              </div>
              
              {/* Sign Out */}
              <div className="border-t border-gray-100 pt-2">
                <button onClick={logOutUser} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAvatarDropdown;