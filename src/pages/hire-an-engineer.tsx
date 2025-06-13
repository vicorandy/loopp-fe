// pages/get-hired.tsx

import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface FormData {
  fullName: string;
  email: string;
  company: string;
  website: string;
  projectTitle: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  company?: string;
  projectTitle?: string;
}

const GetHiredForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    company: '',
    website: '',
    projectTitle: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Please enter a valid email';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.projectTitle.trim())
      newErrors.projectTitle = 'Project title or role is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      alert('Form submitted successfully!');
      setFormData({ fullName: '', email: '', company: '', website: '', projectTitle: '' });
    } catch {
      alert('Error submitting form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1500px] mx-auto">
      <Navbar />

      {/* Header */}
      <div className="text-center mt-[10rem]">
        <div className="inline-block bg-pink-300 text-black font-bold px-8 py-2 rounded-full">
          Hire Now
        </div>
        <h1 className="mt-4 text-[4rem] font-bold text-gray-900">Hire AI Engineer</h1>
        <p className="mt-2 text-gray-700 text-base sm:text-lg pb-10">
          Connect with top‑tier AI engineers tailored to your project needs.
        </p>
      </div>

      {/* Background + Form */}
      <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-end py-4 px-4 md:pr-8 overflow-x-hidden"
        style={{ backgroundImage: "url('/engineer.webp')" }}
      >
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get Started</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

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
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Row 2: Company & Website */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    COMPANY <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your Company"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition ${
                      errors.company ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    WEBSITE <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://your-website.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Stand‑alone: Project Title / Role */}
              <div>
                <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  PROJECT TITLE / ROLE YOU’RE HIRING FOR <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="projectTitle"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleInputChange}
                  placeholder="Senior AI Engineer"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition ${
                    errors.projectTitle ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.projectTitle && (
                  <p className="text-red-500 text-sm mt-1">{errors.projectTitle}</p>
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white font-medium py-3 px-8 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'SUBMITTING...' : 'NEXT'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GetHiredForm;
