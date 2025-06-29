// export default GetHiredForm;
import React, { useState } from 'react';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { toast } from 'react-toastify';
import { useSignUp } from '@/components/libs/hooks/users';
import { SignUpData } from '@/components/libs/types';

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  userRole: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  openToRemoteWork: string;
  yearsOfExperience: string;
}

interface SignInFormData {
  email: string;
  password: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  userRole?: string;
  password?: string;
  confirmPassword?: string;
  yearsOfExperience?: string;
}

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [signUpData, setSignUpData] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    email: '',
    userRole: 'project-engineer',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    openToRemoteWork: 'Yes',
    yearsOfExperience: '',
  });

  const [signInData, setSignInData] = useState<SignInFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const signUpMutation = useSignUp()

  const validateSignUp = (): boolean => {
    const newErrors: FormErrors = {};

    if (!signUpData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!signUpData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!signUpData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!signUpData.userRole) {
      newErrors.userRole = 'User role is required';
    }

    if (!signUpData.password) {
      newErrors.password = 'Password is required';
    } else if (signUpData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!signUpData.yearsOfExperience.trim()) {
      newErrors.yearsOfExperience = 'Years of experience is required';
    } else if (isNaN(Number(signUpData.yearsOfExperience)) || Number(signUpData.yearsOfExperience) < 0) {
      newErrors.yearsOfExperience = 'Please enter a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignIn = (): boolean => {
    const newErrors: FormErrors = {};

    if (!signInData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!signInData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignUpData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSignUpSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!validateSignUp()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const data = await signUpMutation.mutateAsync(signUpData)
      toast.success(data.message)
   
    } catch (error:any) {
       toast.error(error.message)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignInSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!validateSignIn()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call for sign in
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Sign in submitted:', signInData);
      alert('Signed in successfully!');
      
      // Reset form
      setSignInData({
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Error signing in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
    setSignUpData({
      firstName: '',
      lastName: '',
      email: '',
      userRole: 'project-engineer',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      openToRemoteWork: 'Yes',
      yearsOfExperience: '',
    });
    setSignInData({
      email: '',
      password: '',
    });
  };

  return (
    <div className="container mx-auto px-0 lg:px-10 xl:px-33">
      <Navbar />
      <div className="justify-center mt-[10rem]">
        <div className="text-black font-bold bg-[#FFE1E1] p-2 px-8 w-[fit-content] mx-auto rounded-4xl">
          join Loopp
        </div>
        <h1 className="text-center text-[4rem] py-2">
          {isSignUp ? 'Get Hired' : 'Welcome Back'}
        </h1>
        <div className="w-full max-w-2xl mx-auto">
          <p className="text-black font-bold text-center pb-10">
            {isSignUp 
              ? 'Connect with top-tier AI engineers tailored to your project needs.'
              : 'Sign in to your account to continue your journey.'
            }
          </p>
        </div>
      </div>

      <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center md:justify-start py-4 px-4 md:pl-8 md:pr-4 overflow-x-hidden" style={{ backgroundImage: 'url(/hire.webp)' }}>
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 rounded-lg p-1 flex">
                <button
                  onClick={() => setIsSignUp(true)}
                  className={`px-6 py-2 rounded-md transition-all ${
                    isSignUp
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Sign Up
                </button>
                <button
                  onClick={() => setIsSignUp(false)}
                  className={`px-6 py-2 rounded-md transition-all ${
                    !isSignUp
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Sign In
                </button>
              </div>
            </div>

            {isSignUp ? (
              <div className="space-y-4">
                {/* First Name and Last Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      FIRST NAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={signUpData.firstName}
                      onChange={handleSignUpChange}
                      placeholder="John"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      LAST NAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={signUpData.lastName}
                      onChange={handleSignUpChange}
                      placeholder="Doe"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    EMAIL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    placeholder="johndoe@example.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

            

                {/* Password and Confirm Password Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      PASSWORD <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={signUpData.password}
                      onChange={handleSignUpChange}
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      CONFIRM PASSWORD <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={signUpData.confirmPassword}
                      onChange={handleSignUpChange}
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    PHONE NUMBER (OPTIONAL)
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={signUpData.phoneNumber}
                    onChange={handleSignUpChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
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
                      value={signUpData.openToRemoteWork}
                      onChange={handleSignUpChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">
                      YEARS OF EXPERIENCE IN AI <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      value={signUpData.yearsOfExperience}
                      onChange={handleSignUpChange}
                      min="0"
                      step="0.5"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                        errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.yearsOfExperience && (
                      <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleSignUpSubmit}
                    disabled={isSubmitting}
                    className="bg-black text-white font-medium py-3 px-8 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed w-fit"
                  >
                    {isSubmitting ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Email */}
                <div>
                  <label htmlFor="signInEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    EMAIL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="signInEmail"
                    name="email"
                    value={signInData.email}
                    onChange={handleSignInChange}
                    placeholder="johndoe@example.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="signInPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    PASSWORD <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="signInPassword"
                    name="password"
                    value={signInData.password}
                    onChange={handleSignInChange}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <a href="#" className="text-sm text-orange-600 hover:text-orange-700">
                    Forgot your password?
                  </a>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    onClick={handleSignInSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-black text-white font-medium py-3 px-8 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'SIGNING IN...' : 'SIGN IN'}
                  </button>
                </div>
              </div>
            )}

            {/* Switch Auth Mode */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={toggleAuthMode}
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;