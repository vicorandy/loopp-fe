import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Menu, 
  X, 
  Home, 
  Settings, 
  Bell,
  Search,
  Calendar,
  FileText,
  PieChart,
  Activity
} from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

interface ChartData {
  name: string;
  value: number;
}

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const statsData: StatsCardProps[] = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+12.5%',
      isPositive: true,
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: 'Active Users',
      value: '2,431',
      change: '+8.2%',
      isPositive: true,
      icon: <Users className="w-6 h-6" />
    },
    {
      title: 'Growth Rate',
      value: '24.8%',
      change: '-2.4%',
      isPositive: false,
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: 'Conversions',
      value: '1,823',
      change: '+15.3%',
      isPositive: true,
      icon: <BarChart3 className="w-6 h-6" />
    }
  ];

  const chartData: ChartData[] = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 }
  ];

  const sidebarItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard', active: true },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics', active: false },
    { icon: <Users className="w-5 h-5" />, label: 'Users', active: false },
    { icon: <FileText className="w-5 h-5" />, label: 'Reports', active: false },
    { icon: <PieChart className="w-5 h-5" />, label: 'Statistics', active: false },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', active: false }
  ];

  const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, isPositive, icon }) => (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
          <div className="text-gray-600">{icon}</div>
        </div>
        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
    </div>
  );

  const SimpleChart: React.FC = () => (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-xs bg-black text-white rounded-md">6M</button>
          <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-md">1Y</button>
        </div>
      </div>
      <div className="flex items-end space-x-2 h-40">
        {chartData.map((item, index) => (
          <div key={item.name} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-gradient-to-t from-black to-gray-400 rounded-t-md transition-all duration-300 hover:from-gray-800"
              style={{ height: `${(item.value / 6000) * 100}%` }}
            />
            <span className="text-xs text-gray-600 mt-2">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:z-auto w-64`}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                item.active 
                  ? 'bg-gradient-to-r from-black to-gray-800 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
              >
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

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, John</h2>
            <p className="text-gray-600">Here's what's happening with your business today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Charts and Additional Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <SimpleChart />
            </div>
            
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {[
                  { user: 'Alice Johnson', action: 'Created new project', time: '2 hours ago' },
                  { user: 'Bob Smith', action: 'Updated dashboard', time: '4 hours ago' },
                  { user: 'Carol Davis', action: 'Completed task', time: '6 hours ago' },
                  { user: 'David Wilson', action: 'Left a comment', time: '8 hours ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">{activity.user[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'New Report', icon: <FileText className="w-4 h-4" /> },
                  { label: 'Add User', icon: <Users className="w-4 h-4" /> },
                  { label: 'View Analytics', icon: <PieChart className="w-4 h-4" /> },
                  { label: 'Settings', icon: <Settings className="w-4 h-4" /> }
                ].map((action, index) => (
                  <button 
                    key={index}
                    className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-200"
                  >
                    {action.icon}
                    <span className="text-sm font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-black to-gray-800 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Upgrade to Pro</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Unlock advanced features and get detailed analytics for your business.
              </p>
              <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;