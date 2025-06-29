import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  openToRemoteWork: string;
  workType: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  yearsOfExperience?: string;
}

const LooppLandingPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    openToRemoteWork: 'Yes',
    workType: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.workType) {
      newErrors.yearsOfExperience = 'Years of experience is required';
    } 

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        openToRemoteWork: 'Yes',
        workType: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
     <Navbar />

      {/* Hero Section */}
      <section className="text-center py-20 px-6 mt-[7rem]">
        

      <div className=" text-black font-bold bg-[#FFE1E1] p-2 my-4 px-8 w-[fit-content] mx-auto rounded-4xl">
          Career
      </div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Discover your place at Loopp
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Merge AI creativity with profitable and fulfilling career path.
        </p>
        <a href='#contact-form'><button className="bg-black text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors">
          Apply Now
        </button></a>
      </section>

      {/* Features Section */}
      <section className="bg-black py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            Work at one of the most creative places on Earth
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="rounded-lg overflow-hidden">
            <div className="h-64 bg-gradient-to-br from-yellow-100 to-orange-100 overflow-hidden">
              <img src="/career1.webp" className="w-full h-full object-cover" />
            </div>
              <div className="py-3">
                <h3 className="text-xl font-bold text-white mb-3">
                  Work Where You Thrive
                </h3>
                <p className="text-gray-300 mb-4">
                  Discover new freedoms for your best work with flexible environments and cutting-edge tools designed to unleash your potential.
                </p>
                <a href="#contact-form" className="bg-white border-2 border-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-transparent hover:text-white transition-colors inline-block">
                  Apply
                </a>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="rounded-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                 <img src="/career2.webp" className="w-full h-full object-cover" />
              </div>
              <div className="py-3">
                <h3 className="text-xl font-bold text-white mb-3">
                  Your Office, Redefined
                </h3>
                <p className="text-gray-300 mb-4">
                  Redefine how traditional culture with a flexible, innovative workspace designed to enhance collaboration and creativity.
                </p>
                <a href="#contact-form" className="bg-white border-2 border-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-transparent hover:text-white transition-colors inline-block">
                  Apply
                </a>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="rounded-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center">
                 <img src="/career3.webp" className="w-full h-full object-cover" />
              </div>
              <div className="py-3">
                <h3 className="text-xl font-bold text-white mb-3">
                  Live Fully, Work Freely
                </h3>
                <p className="text-gray-300 mb-4">
                  Embrace the ideal work-life integration. Our culture is built for meaningful connections and personal growth.
                </p>
                <a href="#contact-form" className="bg-white border-2 border-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-transparent hover:text-white transition-colors inline-block">
                  Apply
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 px-6 bg-gray-50">
        <div className="mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center shadow-[0_0_20px_0_rgba(0,0,0,0.25)] mx-auto py-5 px-5 rounded-3xl">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Us</h2>
              <p className="text-gray-600 mb-8">Shape the future of AI</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                FULL NAME <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email and Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  EMAIL <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g., johndoe@example.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  PHONE NUMBER (OPTIONAL)
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Remote Work and Experience Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="openToRemoteWork" className="block text-sm font-medium text-gray-700 mb-1">
                  OPEN TO REMOTE WORK?
                </label>
                <select
                  id="openToRemoteWork"
                  name="openToRemoteWork"
                  value={formData.openToRemoteWork}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="preferedWorkType" className="block text-sm font-medium text-gray-700 mb-1">
                  PREFERED WORK TYPE?
                </label>
                <select
                  id="workType"
                  name="workType"
                  value={formData.workType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="Yes">freelance</option>
                  <option value="No">full time</option>
                  <option value="Hybrid">both</option>
                </select>
              </div>

            
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white font-medium py-3 px-8 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed w-fit"
              >
                {isSubmitting ? 'SUBMITTING...' : 'NEXT'}
              </button>
            </div>
              </form>

            </div>

            {/* Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200  h-150 rounded-3xl flex items-center justify-center">
                  <img src="/career4.webp" className='h-full w-full object-cover rounded-3xl' alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

    <Footer />
    </div>
  );
};

export default LooppLandingPage;