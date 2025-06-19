// src/components/Layout.tsx
import React, { ReactNode, useState } from 'react';
import Sidebar from './sidebar';
import Header from './header';

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen  bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Content area */}
      <div className="flex-1 flex flex-col">
        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Header */}
        <Header onBurgerClick={() => setSidebarOpen(true)} />
        
        {/* Main content */}
        <div className="flex-1 pt-16 ">
          <main className="p-4 lg:p-8 ">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;