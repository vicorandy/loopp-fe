// components/SignUpForm.tsx
import React, { useState } from 'react';
import { useSignUp } from '@/components/libs/hooks/users';
import { SignUpData } from '@/components/libs/types';
import { toast } from 'react-toastify';

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<SignUpData>({
    firstName: '',
    lastName: '',
    email: '',
    projectMangerSecret: '',
    password: '',
    userRole: ''
  });

  const signUpMutation = useSignUp();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {

    try {
        e.preventDefault();
        formData.userRole = 'project-manager'
        const data:any = await signUpMutation.mutateAsync(formData);
        toast.success(data.message)
        console.log(data)
    } catch (error:any) {
        toast.error(error?.message)
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="project manager secret" className="block text-sm font-medium text-gray-700">
                Project Manger Secret
              </label>
              <input
                id="projectMangerSecret"
                name="projectMangerSecret"
                type="projectMangerSecret"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Project Manger Secret"
                value={formData.projectMangerSecret}
                onChange={handleChange}
              />
            </div>


          </div>

          <div>
            <button
              type="submit"
              disabled={signUpMutation.isPending}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signUpMutation.isPending ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>

          {signUpMutation.isError && (
            <div className="text-red-600 text-sm text-center">
              {signUpMutation.error instanceof Error 
                ? signUpMutation.error.message 
                : 'An error occurred during sign up'}
            </div>
          )}

          {signUpMutation.isSuccess && (
            <div className="text-green-600 text-sm text-center">
              Account created successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;