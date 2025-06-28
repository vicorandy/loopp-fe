import axios,{AxiosError} from 'axios'
import { SignUpData,LoginData } from '../types';
import { getUsersToken } from '../utils';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;


// Sign Up Function
export async function signUp(data: SignUpData){
  try {
    const response = await axios.post(`${API_BASE_URL}/users/sign-up`, data);
    return response.data;
  } catch (error: any) {
    console.log({error})
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Sign up failed.');
    }
    throw new Error('An unexpected error occurred during sign up.');
  }
}

// Login Function
export async function login(data: LoginData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/sign-in`, data);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Login failed.');
    }
    throw new Error('An unexpected error occurred during login.');
  }
}

//get user
export async function getUser() {
    try {
      const accessToken = getUsersToken();
      console.log('running')
      console.log({accessToken})
      if (!accessToken) return;
      const response = await axios.get(`${API_BASE_URL}/users/get-user-info`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log({response})
      return response.data;
    } catch (error) {
      throw error as AxiosError;
    }
}

//get user
export async function getUsersByRole(userRole:string) {
    try {
      const accessToken = getUsersToken();
      if (!accessToken) return;
      const response = await axios.get(`${API_BASE_URL}/users/get-user-by-role/${userRole}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error as AxiosError;
    }
  }
