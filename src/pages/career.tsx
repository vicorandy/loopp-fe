import React, { useState } from 'react';
import Image from 'next/image';

const LooppLandingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    company: '',
    jobTitle: '',
    phoneNumber: '',
    country: '',
    howDidYouHear: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4">
        <div className="text-red-500 font-bold text-xl">LOOPP</div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">About</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Services</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Contact</a>
        </nav>
      </header>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
	<path  d="M615.2,96.7C240.2,97.8,0,18.9,0,0v100h1000V0C1000,19.2,989.8,96,615.2,96.7z"></path>
</svg>

      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Discover your place at Loopp
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Merge AI creativity with profitable and fulfilling career path.
        </p>
        <button className="bg-black text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors">
          View more
        </button>
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
              <div className="h-64 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                <div className="w-32 h-24 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded"></div>
                </div>
              </div>
              <div className="p-6">
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
                <div className="w-40 h-24 bg-white rounded-lg shadow-lg flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-red-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="p-6">
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
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-16 h-16 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <div className="p-6">
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
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Us</h2>
              <p className="text-gray-600 mb-8">Shape the future of AI</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Country</option>
                      <option value="us">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="ca">Canada</option>
                      <option value="au">Australia</option>
                      <option value="de">Germany</option>
                      <option value="fr">France</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How did you hear about us?
                  </label>
                  <select
                    name="howDidYouHear"
                    value={formData.howDidYouHear}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Please select</option>
                    <option value="social-media">Social Media</option>
                    <option value="search-engine">Search Engine</option>
                    <option value="referral">Referral</option>
                    <option value="advertisement">Advertisement</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="w-64 h-64 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full"></div>
                  </div>
                </div>
                {/* Simulated people in background */}
                <div className="absolute top-8 right-8 w-12 h-12 bg-gray-400 rounded-full opacity-50"></div>
                <div className="absolute bottom-12 left-8 w-10 h-10 bg-gray-500 rounded-full opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-red-500 font-bold text-2xl mb-4">LOOPP</div>
          <p className="text-gray-400 mb-6">
            Merge AI creativity with profitable and fulfilling career path.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LooppLandingPage;