import React, { useState, useRef } from 'react';
import { Plus, Edit, Trash2, Check, X } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/layout';

export interface Service {
  id: string;
  name: string;
  description: string;
  verified: boolean;
  pro: boolean;
  image: string | null; // Updated to handle file preview
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Web Development',
      description: 'Custom website development',
      verified: true,
      pro: false,
      image: '/images/web-dev.jpg'
    },
    {
      id: '2',
      name: 'Mobile App',
      description: 'iOS and Android applications',
      verified: false,
      pro: true,
      image: '/images/mobile-app.jpg'
    }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Omit<Service, 'id'>>({
    name: '',
    description: '',
    verified: false,
    pro: false,
    image: ''
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({
          ...prev,
          image: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setFormData(prev => ({ ...prev, image: '' }));
    }
  };

  const openAddModal = () => {
    setCurrentService(null);
    setFormData({
      name: '',
      description: '',
      verified: false,
      pro: false,
      image: ''
    });
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setCurrentService(service);
    setFormData({
      name: service.name,
      description: service.description,
      verified: service.verified,
      pro: service.pro,
      image: service.image || ''
    });
    setImagePreview(service.image || null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentService) {
      // Update existing service
      setServices(services.map(svc => 
        svc.id === currentService.id ? { ...svc, ...formData } : svc
      ));
    } else {
      // Add new service
      const newService: Service = {
        ...formData,
        id: Date.now().toString()
      };
      setServices([...services, newService]);
    }
    
    setIsModalOpen(false);
    setImagePreview(null);
  };

  const deleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Services</h1>
          <button 
            onClick={openAddModal}
            className="bg-black text-white px-4 py-2 rounded-lg flex items-center text-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200" style={{ tableLayout: 'fixed', width: '100%' }}>
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '60px' }}>Image</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '140px' }}>Name</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Description</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '80px' }}>Verified</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell" style={{ width: '60px' }}>Pro</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '80px' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map(service => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-2 py-4 whitespace-nowrap">
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                      )}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="truncate">{service.name}</div>
                    </td>
                    <td className="px-2 py-4 text-sm text-gray-500 hidden md:table-cell">
                      <div className="truncate">{service.description}</div>
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-center">
                      {service.verified ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-center hidden sm:table-cell">
                      {service.pro ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex justify-center space-x-1">
                        <button
                          onClick={() => openEditModal(service)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteService(service.id)}
                          className="text-red-600 hover:text-red-900"
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

        {/* Add/Edit Service Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
            <div 
              className="bg-white rounded-lg w-full max-w-md mx-4 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {currentService ? 'Edit Service' : 'Add Service'}
                </h2>
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    setImagePreview(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
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
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Image</label>
                    
                    {/* Image preview */}
                    {imagePreview && (
                      <div className="mb-3 relative">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    
                    {/* File input button */}
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      {imagePreview ? 'Change Image' : 'Upload Image'}
                    </button>
                    
                    {/* Hidden file input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    
                    <p className="mt-1 text-xs text-gray-500">
                      Supports JPG, PNG, GIF up to 5MB
                    </p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="verified"
                        checked={formData.verified}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-black rounded"
                      />
                      <span className="ml-2 text-sm">Verified</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="pro"
                        checked={formData.pro}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-black rounded"
                      />
                      <span className="ml-2 text-sm">Pro Service</span>
                    </label>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setImagePreview(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-md"
                  >
                    {currentService ? 'Update Service' : 'Add Service'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ServicesPage;