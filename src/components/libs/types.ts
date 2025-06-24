// types/auth.ts
export interface SignUpData {
    firstName: string;
    lastName: string;
    email: string;
    userRole: string;
    projectMangerSecret: string;
    password: string;
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
export interface GetServicesParams {
  page: number;
  limit: number;
}


export interface AddServicePayload {
  name: string;
  category: string;
  description: string;
  verified: boolean;
  pro: boolean;
  file: File | null;
}
export interface EditServicePayload {
  id: string;
  name: string;
  category: string;
  description: string;
  verified: boolean;
  pro: boolean;
  file: File | null;
}

export const serviceCategories = [
    'All',
    'AI Agents',
    'Video & Image',
    'Voice & Music',
    'Technology',
    'Cybersecurity',
    'Healthcare',
    'Finance & Fintech',
    'Education & EdTech',
    'Real Estate',
    'Robotics and Automation',
    'Project Management',
    'Business',
    'Legal and Compliance',
    'Retail and E-Commerce',
    'Entertainment',
    'Aerospace',
    'Agriculture',
    'Manufacturing',
    'Fashion & Beauty',
    'Gaming & eSports',
    'Transportation',
    'Energy & Sustainability',
    'Supply Chain & Logistics',
    'Tourism & Hospitality',
    'Food & Beverage'
  ];

  export interface Service {
    id : string;
    name: string;
    category :string;
    description: string;
    verified: boolean;
    pro: boolean;
    image: string | null; // Updated to handle file preview
  }