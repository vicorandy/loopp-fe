import React, { useState, useEffect } from 'react';
import DashboardLayout from "@/components/dashboard/project-owner/layout";
import { 
  Edit, 
  Trash2, 
  Eye, 
  Plus,
  FileText,
  DollarSign,
  Calendar,
  Users,
  Tag,
  Upload,
  X
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  budget: number;
  budgetType: 'fixed' | 'hourly';
  timeline: number;
  timelineUnit: 'days' | 'weeks' | 'months';
  status: 'draft' | 'published' | 'closed';
  created_at: string;
  skillsRequired: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'expert';
}

const ProjectsList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 8;

  // Mock data - replace with real API call
  useEffect(() => {
    const fetchProjects = () => {
      try {
        // Simulating API call
        setTimeout(() => {
// Update the mock data creation to use the correct type
const mockProjects: Project[] = Array.from({ length: 15 }, (_, i) => {
  // Define experience levels with proper type
  const levels: ('beginner' | 'intermediate' | 'expert')[] = [
    'beginner', 
    'intermediate', 
    'expert'
  ];
  
  return {
    id: `project-${i + 1}`,
    name: `AI ${['Chatbot', 'Vision System', 'Recommendation Engine', 'Analytics Platform'][i % 4]}`,
    category: ['Machine Learning', 'NLP', 'Computer Vision', 'Data Science'][i % 4],
    description: 'Project description here...',
    budget: [5000, 10000, 7500, 15000][i % 4],
    budgetType: i % 3 === 0 ? 'hourly' : 'fixed',
    timeline: [2, 4, 6, 8][i % 4],
    timelineUnit: i % 2 === 0 ? 'weeks' : 'months',
    status: i % 3 === 0 ? 'draft' : i % 3 === 1 ? 'published' : 'closed',
    created_at: new Date(Date.now() - i * 2 * 24 * 60 * 60 * 1000).toISOString(),
    skillsRequired: ['Python', 'TensorFlow', 'React'].slice(0, (i % 3) + 1),
    experienceLevel: levels[i % 3]  // Fixed: Now uses typed array
  };
});
          setProjects(mockProjects);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to load projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    setProjects(projects.filter(project => project.id !== projectId));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6 h-[80vh] overflow-y-auto">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading projects...</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );

  if (error) return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <X className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6 h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Projects</h1>
            <p className="text-gray-600">Manage and track your active projects</p>
          </div>
          <button
            onClick={() => {/* navigation to create project */}}
            className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first project</p>
            <button
              onClick={() => {/* navigation to create project */}}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Project Cards - Mobile View */}
            <div className="md:hidden space-y-4">
              {currentProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-500">{formatDate(project.created_at)}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      project.status === 'draft' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : project.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="text-sm font-medium text-gray-900 capitalize">{project.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Budget</p>
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(project.budget)}
                        <span className="text-xs text-gray-500 ml-1 capitalize">({project.budgetType})</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Timeline</p>
                      <p className="text-sm font-medium text-gray-900">
                        {project.timeline} {project.timelineUnit}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Experience</p>
                      <p className="text-sm font-medium text-gray-900 capitalize">{project.experienceLevel}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.skillsRequired.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                    {project.skillsRequired.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{project.skillsRequired.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {/* navigate to view */}}
                      className="text-gray-600 hover:text-gray-900 p-1"
                      title="View"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {/* navigate to edit */}}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Table - Desktop View */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Budget
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timeline
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentProjects.map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-gray-600 font-medium">
                                {project.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{project.name}</div>
                              <div className="text-sm text-gray-500">
                                {formatDate(project.created_at)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 capitalize">{project.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatCurrency(project.budget)}
                          </div>
                          <div className="text-sm text-gray-500 capitalize">
                            {project.budgetType}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {project.timeline} {project.timelineUnit}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            project.status === 'draft' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : project.status === 'published'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => {/* navigate to view */}}
                              className="text-gray-600 hover:text-gray-900 p-1"
                              title="View"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {/* navigate to edit */}}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(project.id)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                  <button
                    onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                    disabled={currentPage === totalPages}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstProject + 1}</span> to{' '}
                      <span className="font-medium">{Math.min(indexOfLastProject, projects.length)}</span> of{' '}
                      <span className="font-medium">{projects.length}</span> projects
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      <button
                        onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                      >
                        <span className="sr-only">Previous</span>
                        Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => paginate(page)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                            currentPage === page
                              ? 'bg-black text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                              : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                      >
                        <span className="sr-only">Next</span>
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProjectsList;