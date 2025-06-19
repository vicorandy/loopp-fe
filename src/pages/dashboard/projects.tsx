import React, { useState } from 'react';
import { Plus, Edit, Trash2, UserPlus, X, Calendar, DollarSign } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/layout';

export interface Project {
  id: string;
  name: string;
  deadline: string;
  budget: number;
  status: 'pending' | 'active' | 'completed';
  assignedEngineers: string[]; // Engineer IDs
}

export interface AIEngineer {
  id: string;
  name: string;
  email: string;
  image: string;
  yearsOfExperience: number;
  remoteOption: boolean;
  assignedProjects: string[]; // Project IDs
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'AI Chatbot Development',
      deadline: '2025-08-15',
      budget: 50000,
      status: 'active',
      assignedEngineers: ['1']
    },
    {
      id: '2',
      name: 'Computer Vision System',
      deadline: '2025-09-30',
      budget: 75000,
      status: 'pending',
      assignedEngineers: ['2']
    },
    {
      id: '3',
      name: 'NLP Text Analysis',
      deadline: '2025-07-20',
      budget: 30000,
      status: 'active',
      assignedEngineers: ['1']
    },
    {
      id: '4',
      name: 'Machine Learning Pipeline',
      deadline: '2025-05-10',
      budget: 45000,
      status: 'completed',
      assignedEngineers: []
    },
    {
      id: '5',
      name: 'Recommendation Engine',
      deadline: '2025-10-15',
      budget: 60000,
      status: 'pending',
      assignedEngineers: []
    }
  ]);

  const [engineers] = useState<AIEngineer[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      image: '/images/sarah.jpg',
      yearsOfExperience: 5,
      remoteOption: true,
      assignedProjects: ['1', '3']
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      email: 'marcus.j@example.com',
      image: '',
      yearsOfExperience: 3,
      remoteOption: false,
      assignedProjects: ['2']
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.r@example.com',
      image: '',
      yearsOfExperience: 7,
      remoteOption: true,
      assignedProjects: []
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@example.com',
      image: '',
      yearsOfExperience: 4,
      remoteOption: false,
      assignedProjects: []
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  
  const [formData, setFormData] = useState<Omit<Project, 'id' | 'assignedEngineers'>>({
    name: '',
    deadline: '',
    budget: 0,
    status: 'pending'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'budget' ? parseFloat(value) || 0 : value
    }));
  };

  const openAddModal = () => {
    setCurrentProject(null);
    setFormData({
      name: '',
      deadline: '',
      budget: 0,
      status: 'pending'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setCurrentProject(project);
    setFormData({
      name: project.name,
      deadline: project.deadline,
      budget: project.budget,
      status: project.status
    });
    setIsModalOpen(true);
  };

  const openAssignModal = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsAssignModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentProject) {
      // Update existing project
      setProjects(projects.map(proj => 
        proj.id === currentProject.id 
          ? { ...proj, ...formData }
          : proj
      ));
    } else {
      // Add new project
      const newProject: Project = {
        ...formData,
        id: Date.now().toString(),
        assignedEngineers: []
      };
      setProjects([...projects, newProject]);
    }
    
    setIsModalOpen(false);
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const assignEngineer = (engineerId: string) => {
    setProjects(projects.map(proj => 
      proj.id === selectedProjectId
        ? { 
            ...proj, 
            assignedEngineers: proj.assignedEngineers.includes(engineerId)
              ? proj.assignedEngineers.filter(eid => eid !== engineerId)
              : [...proj.assignedEngineers, engineerId]
          }
        : proj
    ));
  };

  const changeProjectStatus = (projectId: string, newStatus: 'pending' | 'active' | 'completed') => {
    setProjects(projects.map(proj => 
      proj.id === projectId 
        ? { ...proj, status: newStatus }
        : proj
    ));
  };

  const getEngineerName = (engineerId: string) => {
    return engineers.find(e => e.id === engineerId)?.name || 'Unknown Engineer';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const selectedProject = projects.find(proj => proj.id === selectedProjectId);

  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Projects</h1>
          <button 
            onClick={openAddModal}
            className="bg-black text-white px-4 py-2 rounded-lg flex items-center text-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200" style={{ tableLayout: 'fixed', width: '100%' }}>
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '200px' }}>Project Name</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell" style={{ width: '120px' }}>Deadline</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell" style={{ width: '100px' }}>Budget</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '120px' }}>Status</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Assigned Engineers</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '120px' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map(project => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-2 py-4 text-sm font-medium text-gray-900">
                      <div className="truncate">{project.name}</div>
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        {formatDate(project.deadline)}
                      </div>
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                        {formatCurrency(project.budget)}
                      </div>
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm">
                      <select
                        value={project.status}
                        onChange={(e) => changeProjectStatus(project.id, e.target.value as 'pending' | 'active' | 'completed')}
                        className={`px-2 py-1 text-xs rounded-full border-0 cursor-pointer ${getStatusColor(project.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-2 py-4 text-sm text-gray-500 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {project.assignedEngineers.slice(0, 2).map(engineerId => (
                          <span 
                            key={engineerId} 
                            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                          >
                            {getEngineerName(engineerId).split(' ')[0]}
                          </span>
                        ))}
                        {project.assignedEngineers.length > 2 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                            +{project.assignedEngineers.length - 2}
                          </span>
                        )}
                        {project.assignedEngineers.length === 0 && (
                          <span className="text-xs text-gray-400">Unassigned</span>
                        )}
                      </div>
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex justify-center space-x-1">
                        <button
                          onClick={() => openAssignModal(project.id)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Assign Engineer"
                        >
                          <UserPlus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(project)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit Project"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Project Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
            <div 
              className="bg-white rounded-lg w-full max-w-md mx-4 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {currentProject ? 'Edit Project' : 'Add Project'}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Project Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Deadline</label>
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Budget ($)</label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      min="0"
                      step="1000"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-md"
                  >
                    {currentProject ? 'Update Project' : 'Add Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Assign Engineer Modal */}
        {isAssignModalOpen && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
            <div 
              className="bg-white rounded-lg w-full max-w-lg mx-4 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  Assign Engineers to {selectedProject.name}
                </h2>
                <button 
                  onClick={() => setIsAssignModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {engineers.map(engineer => (
                  <div 
                    key={engineer.id} 
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      {engineer.image ? (
                        <img
                          src={engineer.image}
                          alt={engineer.name}
                          className="w-8 h-8 object-cover rounded-full"
                        />
                      ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-full w-8 h-8 flex items-center justify-center">
                          <span className="text-xs text-gray-500 font-medium">
                            {engineer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="text-sm font-medium">{engineer.name}</h3>
                        <p className="text-xs text-gray-500">{engineer.yearsOfExperience}y experience</p>
                      </div>
                    </div>
                    <button
                      onClick={() => assignEngineer(engineer.id)}
                      className={`px-3 py-1 text-sm rounded-md ${
                        selectedProject.assignedEngineers.includes(engineer.id)
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      {selectedProject.assignedEngineers.includes(engineer.id) ? 'Remove' : 'Assign'}
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-4 py-2 bg-black text-white rounded-md"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProjectsPage;