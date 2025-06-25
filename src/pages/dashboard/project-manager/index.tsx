import React, { useState } from 'react';
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Bot, 
  User, 
  Briefcase,
  BarChart3,
  Activity,
  Bell,
  Plus,
  ArrowRight,
  Star,
  Target,
  Zap
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/project-manager/layout';

interface TeamMember {
  id: string;
  name: string;
  role: 'ai-engineer' | 'project-owner';
  status: 'online' | 'offline' | 'away';
  avatar: string;
  activeProjects: number;
  completedTasks: number;
  rating: number;
}

interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'pending' | 'overdue';
  progress: number;
  dueDate: string;
  teamSize: number;
  priority: 'high' | 'medium' | 'low';
}

interface RecentActivity {
  id: string;
  type: 'message' | 'task' | 'project' | 'milestone';
  description: string;
  user: string;
  timestamp: string;
  priority?: 'high' | 'medium' | 'low';
}

const DashboardIndex = () => {
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'ai-engineer',
      status: 'online',
      avatar: '',
      activeProjects: 3,
      completedTasks: 24,
      rating: 4.9
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      role: 'ai-engineer',
      status: 'away',
      avatar: '',
      activeProjects: 2,
      completedTasks: 18,
      rating: 4.7
    },
    {
      id: '3',
      name: 'Alex Rodriguez',
      role: 'project-owner',
      status: 'online',
      avatar: '',
      activeProjects: 4,
      completedTasks: 31,
      rating: 4.8
    },
    {
      id: '4',
      name: 'Emily Watson',
      role: 'project-owner',
      status: 'offline',
      avatar: '',
      activeProjects: 2,
      completedTasks: 15,
      rating: 4.6
    }
  ]);

  const [projects] = useState<Project[]>([
    {
      id: '1',
      name: 'ML Model Optimization',
      status: 'active',
      progress: 75,
      dueDate: '2025-07-15',
      teamSize: 3,
      priority: 'high'
    },
    {
      id: '2',
      name: 'Customer Analytics Dashboard',
      status: 'active',
      progress: 45,
      dueDate: '2025-08-02',
      teamSize: 4,
      priority: 'medium'
    },
    {
      id: '3',
      name: 'API Integration',
      status: 'pending',
      progress: 20,
      dueDate: '2025-07-30',
      teamSize: 2,
      priority: 'low'
    },
    {
      id: '4',
      name: 'Data Pipeline Automation',
      status: 'overdue',
      progress: 60,
      dueDate: '2025-06-20',
      teamSize: 3,
      priority: 'high'
    }
  ]);

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'milestone',
      description: 'ML model training completed with 94% accuracy',
      user: 'Sarah Chen',
      timestamp: '5 minutes ago',
      priority: 'high'
    },
    {
      id: '2',
      type: 'message',
      description: 'New message about project timeline',
      user: 'Alex Rodriguez',
      timestamp: '15 minutes ago'
    },
    {
      id: '3',
      type: 'task',
      description: 'Code review completed for API changes',
      user: 'Marcus Johnson',
      timestamp: '1 hour ago'
    },
    {
      id: '4',
      type: 'project',
      description: 'New project "Customer Analytics" created',
      user: 'Emily Watson',
      timestamp: '2 hours ago'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageCircle className="w-4 h-4" />;
      case 'task': return <CheckCircle className="w-4 h-4" />;
      case 'project': return <Briefcase className="w-4 h-4" />;
      case 'milestone': return <Target className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="h-[80vh] p-6 overflow-y-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, Project Manager! 👋
              </h1>
              <p className="text-xl text-gray-600">
                Here's what's happening with your team today
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all shadow-lg flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>New Project</span>
              </button>
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl border border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {teamMembers.length}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Total Team</h3>
            <p className="text-sm text-gray-600">
              {teamMembers.filter(m => m.role === 'ai-engineer').length} AI Engineers, {' '}
              {teamMembers.filter(m => m.role === 'project-owner').length} Project Owners
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {projects.filter(p => p.status === 'active').length}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Active Projects</h3>
            <p className="text-sm text-gray-600">
              {projects.filter(p => p.status === 'overdue').length} overdue projects
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {teamMembers.reduce((sum, member) => sum + member.completedTasks, 0)}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Tasks Completed</h3>
            <p className="text-sm text-gray-600">This month</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <MessageCircle className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">24</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Messages</h3>
            <p className="text-sm text-gray-600">3 unread messages</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects Overview */}
          <div className="lg:col-span-2">

            {/* Projects Overview */}
            <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Active Projects</h2>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center space-x-1">
                  <span>Manage All</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${getProjectStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(project.priority)}`}>
                            {project.priority} priority
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Due: {project.dueDate}</p>
                        <p className="text-xs text-gray-500">{project.teamSize} team members</p>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            project.status === 'overdue' ? 'bg-red-500' :
                            project.progress >= 75 ? 'bg-green-500' :
                            project.progress >= 50 ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-xl hover:opacity-90 transition-all flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5" />
                  <span>Open Chat</span>
                </button>
                <button className="w-full bg-blue-50 text-blue-700 p-3 rounded-xl hover:bg-blue-100 transition-all flex items-center space-x-3">
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Meeting</span>
                </button>
                <button className="w-full bg-green-50 text-green-700 p-3 rounded-xl hover:bg-green-100 transition-all flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5" />
                  <span>View Reports</span>
                </button>
                <button className="w-full bg-purple-50 text-purple-700 p-3 rounded-xl hover:bg-purple-100 transition-all flex items-center space-x-3">
                  <Zap className="w-5 h-5" />
                  <span>Assign Task</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'milestone' ? 'bg-green-100 text-green-600' :
                      activity.type === 'message' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'task' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {activity.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-600">{activity.user}</p>
                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardIndex;