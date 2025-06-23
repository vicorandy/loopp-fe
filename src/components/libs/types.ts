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
  file: File;
}