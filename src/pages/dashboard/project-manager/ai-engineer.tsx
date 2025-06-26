import React, { useState, useEffect } from 'react';
import { Plus, UserPlus, X, Check } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/project-manager/layout';
import { useGetUserByRole } from '@/components/libs/hooks/users';

export interface Project {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'completed';
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

const AIEngineersPage = () => {
  const [engineers, setEngineers] = useState<AIEngineer[]>([]);
  const [projects] = useState<Project[]>([
    { id: '1', name: 'AI Chatbot Development', status: 'active' },
    { id: '2', name: 'Computer Vision System', status: 'pending' },
    { id: '3', name: 'NLP Text Analysis', status: 'active' },
    { id: '4', name: 'Machine Learning Pipeline', status: 'completed' },
    { id: '5', name: 'Recommendation Engine', status: 'pending' }
  ]);

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedEngineerId, setSelectedEngineerId] = useState<string>('');
  const { data, isLoading } = useGetUserByRole('project-engineer');

  useEffect(() => {
    if (data?.users) {
      const transformedEngineers = data.users.map((user:any) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        image: '', // Placeholder since image isn't in API response
        yearsOfExperience: user.yearsOfExperience,
        remoteOption: user.openToRemoteWork,
        assignedProjects: [] // Initialize empty
      }));
      setEngineers(transformedEngineers);
    }
  }, [data]);

  const openAssignModal = (engineerId: string) => {
    setSelectedEngineerId(engineerId);
    setIsAssignModalOpen(true);
  };

  const assignProject = (projectId: string) => {
    setEngineers(engineers.map(eng => 
      eng.id === selectedEngineerId
        ? { 
            ...eng, 
            assignedProjects: eng.assignedProjects.includes(projectId)
              ? eng.assignedProjects.filter(pid => pid !== projectId)
              : [...eng.assignedProjects, projectId]
          }
        : eng
    ));
  };

  const getProjectName = (projectId: string) => {
    return projects.find(p => p.id === projectId)?.name || 'Unknown Project';
  };

  const getProjectStatus = (projectId: string) => {
    return projects.find(p => p.id === projectId)?.status || 'unknown';
  };

  const selectedEngineer = engineers.find(eng => eng.id === selectedEngineerId);

  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">AI Engineers</h1>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200" style={{ tableLayout: 'fixed', width: '100%' }}>
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '60px' }}>Image</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '140px' }}>Name</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Email</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell" style={{ width: '80px' }}>Experience</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '70px' }}>Remote</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Projects</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      Loading engineers...
                    </td>
                  </tr>
                ) : engineers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      No engineers found
                    </td>
                  </tr>
                ) : (
                  engineers.map(engineer => (
                    <tr key={engineer.id} className="hover:bg-gray-50">
                      <td className="px-2 py-4 whitespace-nowrap">
                        {engineer.image ? (
                          <img
                            src={engineer.image}
                            alt={engineer.name}
                            className="w-10 h-10 object-cover rounded-full"
                          />
                        ) : (
                          <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10 flex items-center justify-center">
                            <span className="text-xs text-gray-500 font-medium">
                              {engineer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="truncate">{engineer.name}</div>
                      </td>
                      <td className="px-2 py-4 text-sm text-gray-500 hidden md:table-cell">
                        <div className="truncate">{engineer.email}</div>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell text-center">
                        {engineer.yearsOfExperience}y
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-center">
                        {engineer.remoteOption ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        )}
                      </td>
                      <td className="px-2 py-4 text-sm text-gray-500 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {engineer.assignedProjects.slice(0, 2).map(projectId => (
                            <span 
                              key={projectId} 
                              className={`px-2 py-1 text-xs rounded-full ${
                                getProjectStatus(projectId) === 'active' ? 'bg-green-100 text-green-800' :
                                getProjectStatus(projectId) === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {getProjectName(projectId).length > 15 
                                ? getProjectName(projectId).substring(0, 15) + '...' 
                                : getProjectName(projectId)
                              }
                            </span>
                          ))}
                          {engineer.assignedProjects.length > 2 && (
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                              +{engineer.assignedProjects.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex justify-center space-x-1">
                          <button
                            onClick={() => openAssignModal(engineer.id)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Assign Project"
                          >
                            <UserPlus className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Assign Project Modal */}
        {isAssignModalOpen && selectedEngineer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
            <div 
              className="bg-white rounded-lg w-full max-w-lg mx-4 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  Assign Projects to {selectedEngineer.name}
                </h2>
                <button 
                  onClick={() => setIsAssignModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {projects.map(project => (
                  <div 
                    key={project.id} 
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-medium">{project.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          project.status === 'active' ? 'bg-green-100 text-green-800' :
                          project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => assignProject(project.id)}
                      className={`px-3 py-1 text-sm rounded-md ${
                        selectedEngineer.assignedProjects.includes(project.id)
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      {selectedEngineer.assignedProjects.includes(project.id) ? 'Remove' : 'Assign'}
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

export default AIEngineersPage;