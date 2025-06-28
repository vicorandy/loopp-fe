// pages/get-hired.tsx

import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  partnershipType: string;
  referralSource: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  partnershipType?: string;
  referralSource?: string;
}

const GetHiredForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    partnershipType: '',
    referralSource: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    if (!formData.partnershipType) {
      newErrors.partnershipType = 'Partnership type is required';
    }
    if (!formData.referralSource) {
      newErrors.referralSource = 'Please let us know how you heard about us';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1000));
      alert('Form submitted successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        partnershipType: '',
        referralSource: '',
      });
    } catch {
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-0 lg:px-33">
      <Navbar />

      {/* Header */}
      <div className="text-center mt-[10rem]">
        <div className="inline-block bg-pink-300 text-black font-bold px-8 py-2 rounded-full">
          Join Us
        </div>
        <h1 className="mt-4 text-[4rem] font-bold text-gray-900">Become a Partner</h1>
        <p className="mt-2 text-gray-700 text-lg pb-10">
          Connect with top‑tier AI engineers tailored to your project needs.
        </p>
      </div>

      {/* Background + Form */}
      <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-end py-4 px-4 md:pr-8 overflow-x-hidden"
        style={{ backgroundImage: "url('/patner.jpg')" }}
      >
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get Started</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: First & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    FIRST NAME <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    LAST NAME <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Row 2: Email & Phone Number */}
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
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    PHONE NUMBER <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123‑4567"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>
              </div>

              {/* Row 3: Partnership Type & Referral */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="partnershipType" className="block text-sm font-medium text-gray-700 mb-1">
                    PARTNERSHIP TYPE <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="partnershipType"
                    name="partnershipType"
                    value={formData.partnershipType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white ${
                      errors.partnershipType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select type...</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Development">Development</option>
                    <option value="Support">Support</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.partnershipType && (
                    <p className="text-red-500 text-sm mt-1">{errors.partnershipType}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="referralSource" className="block text-sm font-medium text-gray-700 mb-1">
                    HOW DID YOU HEAR ABOUT US? <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="referralSource"
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white ${
                      errors.referralSource ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select source...</option>
                    <option value="Search">Search Engine</option>
                    <option value="Social">Social Media</option>
                    <option value="Referral">Friend/Colleague</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.referralSource && (
                    <p className="text-red-500 text-sm mt-1">{errors.referralSource}</p>
                  )}
                </div>
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
