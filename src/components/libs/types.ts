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
  

  