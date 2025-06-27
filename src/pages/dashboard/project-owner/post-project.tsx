import React, { useState } from 'react';
import DashboardLayout from "@/components/dashboard/project-owner/layout";
import { 
  Upload, 
  X, 
  Plus, 
  Calendar, 
  DollarSign, 
  FileText, 
  Users, 
  Clock,
  Tag,
  AlertCircle
} from 'lucide-react';

interface ProjectFormData {
  name: string;
  description: string;
  category: string;
  budget: string;
  budgetType: 'fixed' | 'hourly';
  timeline: string;
  timelineUnit: 'days' | 'weeks' | 'months';
  skillsRequired: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'expert';
  projectType: 'one-time' | 'ongoing';
  attachments: File[];
  requirements: string;
  deliverables: string;
  communicationPreference: 'email' | 'chat' | 'video-calls';
  maxProposals: number;
}

const PostNewProject = () => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    category: '',
    budget: '',
    budgetType: 'fixed',
    timeline: '',
    timelineUnit: 'weeks',
    skillsRequired: [],
    experienceLevel: 'intermediate',
    projectType: 'one-time',
    attachments: [],
    requirements: '',
    deliverables: '',
    communicationPreference: 'chat',
    maxProposals: 20
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    'Machine Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Data Science',
    'Web Development',
    'Mobile Development',
    'Automation',
    'Chatbots',
    'Recommendation Systems',
    'Other'
  ];

  const commonSkills = [
    'Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy',
    'OpenCV', 'NLP', 'Deep Learning', 'Machine Learning', 'Data Analysis',
    'API Development', 'React', 'Node.js', 'SQL', 'MongoDB'
  ];

  const handleInputChange = (field: keyof ProjectFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skillsRequired.includes(skill)) {
      handleInputChange('skillsRequired', [...formData.skillsRequired, skill]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    handleInputChange('skillsRequired', 
      formData.skillsRequired.filter(skill => skill !== skillToRemove)
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleInputChange('attachments', [...formData.attachments, ...files]);
  };

  const removeFile = (index: number) => {
    const newFiles = formData.attachments.filter((_, i) => i !== index);
    handleInputChange('attachments', newFiles);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Project name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.budget || parseFloat(formData.budget) <= 0) newErrors.budget = 'Valid budget is required';
    if (!formData.timeline || parseInt(formData.timeline) <= 0) newErrors.timeline = 'Valid timeline is required';
    if (formData.skillsRequired.length === 0) newErrors.skills = 'At least one skill is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle form submission here
      alert('Project posted successfully!');
    }
  };

  const handleSaveDraft = () => {
    console.log('Draft saved:', formData);
    alert('Draft saved successfully!');
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6 h-[80vh] overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post New Project</h1>
          <p className="text-gray-600">Create a detailed project listing to attract the best AI engineers</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Basic Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., AI Chatbot for Customer Support"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe your project in detail. Include goals, scope, and what you're looking to achieve..."
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
            </div>
          </div>

          {/* Budget & Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Budget & Timeline
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget *
                </label>
                <div className="flex">
                  <select
                    value={formData.budgetType}
                    onChange={(e) => handleInputChange('budgetType', e.target.value)}
                    className="px-3 py-3 border border-r-0 rounded-l-lg border-gray-300 bg-gray-50"
                  >
                    <option value="fixed">Fixed</option>
                    <option value="hourly">Hourly</option>
                  </select>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className={`flex-1 px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                      errors.budget ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter amount"
                  />
                </div>
                {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeline *
                </label>
                <div className="flex">
                  <input
                    type="number"
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className={`flex-1 px-4 py-3 border border-r-0 rounded-l-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                      errors.timeline ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Duration"
                  />
                  <select
                    value={formData.timelineUnit}
                    onChange={(e) => handleInputChange('timelineUnit', e.target.value)}
                    className="px-3 py-3 border rounded-r-lg border-gray-300 bg-gray-50"
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                  </select>
                </div>
                {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Type
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="one-time">One-time Project</option>
                  <option value="ongoing">Ongoing Work</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Proposals
                </label>
                <input
                  type="number"
                  value={formData.maxProposals}
                  onChange={(e) => handleInputChange('maxProposals', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  min="1"
                  max="50"
                />
              </div>
            </div>
          </div>

          {/* Skills & Requirements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Skills & Requirements
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Skills *
                </label>
                <div className="flex mb-3">
                  <input
                    type="text"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    className="flex-1 px-4 py-2 border border-r-0 rounded-l-lg border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Add a skill"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(currentSkill))}
                  />
                  <button
                    type="button"
                    onClick={() => addSkill(currentSkill)}
                    className="px-4 py-2 bg-black text-white rounded-r-lg hover:bg-gray-800"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-2">Popular skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {commonSkills.map(skill => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => addSkill(skill)}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {formData.skillsRequired.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.skillsRequired.map(skill => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-1 bg-black text-white text-sm rounded-full"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 hover:text-gray-300"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level Required
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="beginner">Beginner (0-2 years)</option>
                  <option value="intermediate">Intermediate (2-5 years)</option>
                  <option value="expert">Expert (5+ years)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Communication Preference
                </label>
                <select
                  value={formData.communicationPreference}
                  onChange={(e) => handleInputChange('communicationPreference', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="email">Email</option>
                  <option value="chat">Chat/Messaging</option>
                  <option value="video-calls">Video Calls</option>
                </select>
              </div>
            </div>
          </div>

          {/* Detailed Requirements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Tag className="w-5 h-5 mr-2" />
              Detailed Requirements
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specific Requirements
                </label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="List specific technical requirements, constraints, or preferences..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Deliverables
                </label>
                <textarea
                  value={formData.deliverables}
                  onChange={(e) => handleInputChange('deliverables', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="What should be delivered? (e.g., source code, documentation, deployed model, etc.)"
                />
              </div>
            </div>
          </div>

          {/* File Attachments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Attachments (Optional)
            </h2>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">Upload project files, requirements documents, or reference materials</p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 cursor-pointer"
                >
                  Choose Files
                </label>
                <p className="text-sm text-gray-500 mt-2">PDF, DOC, TXT, PNG, JPG (Max 10MB each)</p>
              </div>

              {formData.attachments.length > 0 && (
                <div className="space-y-2">
                  {formData.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Save as Draft
            </button>
            
            <div className="flex space-x-4">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Preview
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 font-medium"
              >
                Post Project
              </button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default PostNewProject;