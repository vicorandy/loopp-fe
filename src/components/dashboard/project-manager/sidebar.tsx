// src/components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Home,
  Settings,
  LineChart,
  MessageSquareText,
  Users2,
  FolderKanban,
  Cpu,
  BarChartBig,
} from 'lucide-react';

interface SidebarProps { open: boolean; onClose: () => void; }
const navItems = [
  { path: '/dashboard/project-manager', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
  { path: '/dashboard/project-manager/services', label: 'Services', icon: <Settings className="w-5 h-5" /> },
  { path: '/dashboard/project-manager/ai-engineer', label: 'AI Engineers', icon: <Cpu className="w-5 h-5" /> },
  { path: '/dashboard/project-manager/projects', label: 'Projects', icon: <FolderKanban className="w-5 h-5" /> },
  { path: '/dashboard/project-manager/chat', label: 'Chats', icon: <MessageSquareText className="w-5 h-5" /> },
  { path: '/dashboard/project-manager/statistics', label: 'Statistics', icon: <BarChartBig className="w-5 h-5" /> },
  { path: '/dashboard/project-manager/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const router = useRouter();
  return (
    <div className={`fixed left-0 top-0 h-[100vh] bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto w-64`}>
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">Dashboard</h1>
        <button onClick={onClose} className="lg:hidden p-1 rounded-md hover:bg-gray-100">✕</button>
      </div>
      <nav className="p-4 space-y-2">
        {navItems.map(item => {
          const isActive = router.pathname === item.path;
          return (
            <Link key={item.path} href={item.path} className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 w-full ${isActive ? 'bg-gradient-to-r from-black to-gray-800 text-white' : 'text-gray-600 hover:bg-gray-100'}`} onClick={onClose}>
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
